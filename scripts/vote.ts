import hre, { ethers } from "hardhat";
import { MACI } from "../typechain/MACI";
import { Command, Keypair, PrivKey, PubKey } from "maci-domainobjs";
import fs from "fs";
import path from "path";

let maci: MACI;
let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

const voterIndex = 2;

type Voter = {
  sk: string;
  maci: string;
  stateIndex: string;
};

type Coordinator = {
  pk: string;
  maci: string;
};

async function main() {
  const votersPath = path.join(__dirname, "/voters.json");
  const coordinatorPath = path.join(__dirname, "/coordinator.json");
  if (!fs.existsSync(votersPath)) {
    throw new Error("voters.json not found");
  } else if (!fs.existsSync(coordinatorPath)) {
    throw new Error("coordinator.json not found");
  }

  const votersData = fs.readFileSync(votersPath).toString();
  const voters = JSON.parse(votersData).voters;

  const coordinatorData = fs.readFileSync(coordinatorPath).toString();
  const coordinator = JSON.parse(coordinatorData) as Coordinator;

  const voter = voters[voterIndex] as Voter;
  const privKey = PrivKey.unserialize(voter.sk);
  const voterKeypair = new Keypair(privKey);

  console.log("Private key:", voterKeypair.privKey.serialize());
  console.log("Public key: ", voterKeypair.pubKey.serialize());

  const stateIndex = BigInt(voter.stateIndex);
  const voteOptionIndex = BigInt(0);
  const voteWeight = BigInt(1);
  const nonce = BigInt(0);

  const encKeypair = new Keypair();

  const command = new Command(stateIndex, voterKeypair.pubKey, voteOptionIndex, voteWeight, nonce);
  const signature = command.sign(voterKeypair.privKey);

  const message = command.encrypt(
    signature,
    Keypair.genEcdhSharedKey(encKeypair.privKey, PubKey.unserialize(coordinator.pk)),
  );

  // maci contract
  const [, , alice] = await ethers.getSigners();
  maci = (await ethers.getContractAt("contracts/MACI.sol:MACI", maciAddress, alice)) as MACI;
  // @ts-ignore
  await maci.publishMessage(message.asContractParam(), encKeypair.pubKey.asContractParam());
  console.log("Successfully publish message");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
