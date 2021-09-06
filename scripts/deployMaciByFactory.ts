import { ethers } from "hardhat";
import { deployMaciFactory } from "../utils/deployment";
import { MaciParameters } from "../utils/maci";
import { MACIFactory } from "../typechain/MACIFactory";

import { Election__factory } from "../typechain/factories/Election__factory";
import { Election } from "../typechain/Election";

import { getGasUsage } from "../utils/contracts";
import { Keypair } from "maci-domainobjs";
import { Signer } from "@ethersproject/abstract-signer";
import { getContractAddress } from "ethers/lib/utils";

let maciFactory: MACIFactory;

async function deployElection(signer: Signer, coordinatorAddr: string) {
  const Election = (await ethers.getContractFactory("Election")) as Election__factory;
  const election = (await Election.deploy(coordinatorAddr)) as Election;
  await election.deployed();
  return election;
}

async function main() {
  const [deployer, coordinator] = await ethers.getSigners();

  maciFactory = (await deployMaciFactory(deployer)) as MACIFactory;
  console.log("MACIFactory deployed to: ", maciFactory.address);

  const maciParameters = await MaciParameters.read(maciFactory);
  console.log("maciParameters: ", maciParameters);

  const election = await deployElection(deployer, coordinator.address);

  const coordinatorKeypair = new Keypair();

  const maciDeployed = maciFactory.deployMaci(
    election.address,
    election.address,
    coordinator.address,
    coordinatorKeypair.pubKey.asContractParam(),
  );

  const deployTx = await maciDeployed;

  console.log("MACI deployed to: ", getContractAddress(deployTx));
  console.log("Gas Usage: ", await getGasUsage(deployTx));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// MACIFactory: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// MACI: 0x0165878A594ca255338adfa4d48449f69242Eb8F
