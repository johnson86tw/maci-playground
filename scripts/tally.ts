import hre, { ethers } from "hardhat";
import { MACI } from "../typechain/MACI";
import { Command, Keypair, PrivKey, PubKey } from "maci-domainobjs";
import { genProofs, proveOnChain } from "maci-cli";

import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../", "/state.json");

let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

type Coordinator = {
  sk: string;
  pk: string;
};

async function main() {
  const [deployer, coordinator] = await ethers.getSigners();

  if (!fs.existsSync(filePath)) {
    throw new Error("Error: state.json not found");
  }

  const state = JSON.parse(fs.readFileSync(filePath).toString());
  const coordinatorState = state.coordinator as Coordinator;

  const maci = (await ethers.getContractAt("contracts/MACI.sol:MACI", maciAddress, coordinator)) as MACI;

  const results = await genProofs({
    contract: maciAddress,
    eth_provider: "http://127.0.0.1:8545/",
    privkey: coordinatorState.sk,
    tally_file: "tally.json",
    output: "proofs.json",
  });
  if (!results) {
    throw new Error("generation of proofs failed");
  }

  console.log(results.tally);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

const log = (msg: string, quiet: boolean) => {
  if (!quiet) {
    console.log(msg);
  }
};
