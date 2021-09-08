import hre, { ethers } from "hardhat";
import { MACI } from "../typechain/MACI";
import { Keypair } from "maci-domainobjs";
import { getEventArg } from "../utils/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../", "/state.json");

let maci: MACI;
let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

type Voter = {
  sk: string;
  stateIndex: string;
};

const DEFAULT_SG_DATA = "0x0000000000000000000000000000000000000000000000000000000000000000";
const DEFAULT_IVCP_DATA = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function main() {
  const [, , voter] = await ethers.getSigners();
  const userKeypair = new Keypair();

  console.log("Private key:", userKeypair.privKey.serialize());
  console.log("Public key: ", userKeypair.pubKey.serialize());

  maci = (await ethers.getContractAt("contracts/MACI.sol:MACI", maciAddress)) as MACI;
  console.log("maci address: ", maci.address);

  const maciAsAlice = maci.connect(voter);
  const tx = await maciAsAlice.signUp(userKeypair.pubKey.asContractParam(), DEFAULT_SG_DATA, DEFAULT_IVCP_DATA);
  const stateIndex = (await getEventArg(tx, maci, "SignUp", "_stateIndex")) as BigNumber;

  console.log("State Index: ", stateIndex.toString());
  console.log("numSignUps: ", (await maci.numSignUps()).toString());

  // write state.json
  const userData = {
    sk: userKeypair.privKey.serialize(),
    stateIndex: stateIndex.toString(),
  };

  if (!fs.existsSync(filePath)) {
    throw new Error("state.json not found: you should deploy maci at first.");
  } else {
    const state = JSON.parse(fs.readFileSync(filePath).toString());
    if (state.maci !== maci.address) throw new Error("Failed to write state.json: maci address not match.");

    const voters: Voter[] | undefined = state.voters;
    if (voters) {
      voters.push(userData);
      state.voters = voters;
    } else {
      state.voters = [userData];
    }

    fs.writeFileSync(filePath, JSON.stringify(state));
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
