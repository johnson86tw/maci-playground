import hre, { ethers } from "hardhat";
import { MACI } from "../typechain/MACI";
import { Keypair } from "maci-domainobjs";
import { getEventArg } from "../utils/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import fs from "fs";
import path from "path";

let maci: MACI;
let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

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

  // writing voters.json

  const userData = {
    sk: userKeypair.privKey.serialize(),
    maci: maci.address,
    stateIndex: stateIndex.toString(),
  };

  const filePath = path.join(__dirname, "/voters.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ voters: [userData] }));
  } else {
    const data = fs.readFileSync(filePath).toString();
    const voters = JSON.parse(data).voters;
    voters.push(userData);
    fs.writeFileSync(filePath, JSON.stringify({ voters }));
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
