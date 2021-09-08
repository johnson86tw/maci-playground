import hre, { ethers } from "hardhat";
import { MACI } from "../typechain/MACI";
import { Command, Keypair, PrivKey, PubKey } from "maci-domainobjs";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../", "/state.json");

let maci: MACI;
let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

const voterIndex = 0;

type Voter = {
  sk: string;
  stateIndex: string;
};

type Coordinator = {
  pk: string;
};

async function main() {
  if (!fs.existsSync(filePath)) {
    throw new Error("Error: state.json not found");
  }

  const state = JSON.parse(fs.readFileSync(filePath).toString());

  const voter = state.voters[voterIndex] as Voter;
  const coordinator = state.coordinator as Coordinator;

  const voterKeypair = new Keypair(PrivKey.unserialize(voter.sk));
  console.log("stateIndex: ", voter.stateIndex);
  console.log("Private key: ", voterKeypair.privKey.serialize());
  console.log("Public key: ", voterKeypair.pubKey.serialize());

  // sign signature
  const stateIndex = BigInt(voter.stateIndex);
  const voteOptionIndex = BigInt(0);
  const voteWeight = BigInt(1);
  const nonce = BigInt(0);

  const encKeypair = new Keypair();

  const command = new Command(stateIndex, voterKeypair.pubKey, voteOptionIndex, voteWeight, nonce);
  const signature = command.sign(voterKeypair.privKey);

  // encrypt message
  const message = command.encrypt(
    signature,
    Keypair.genEcdhSharedKey(encKeypair.privKey, PubKey.unserialize(coordinator.pk)),
  );

  // publish message
  const [, , alice] = await ethers.getSigners();
  maci = (await ethers.getContractAt("contracts/MACI.sol:MACI", maciAddress, alice)) as MACI;
  // @ts-ignore
  await maci.publishMessage(message.asContractParam(), encKeypair.pubKey.asContractParam());
  console.log("Successfully publish message");

  console.log("numMessages: ", (await maci.numMessages()).toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
