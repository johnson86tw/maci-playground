import { ethers } from "hardhat";
import { MaciParameters } from "../utils/maci";
import { CIRCUITS, deployBallot } from "../utils/deployment";
import { Libraries } from "hardhat/types/runtime";
import { MACI__factory } from "../typechain/factories/MACI__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Keypair } from "maci-domainobjs";

import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../", "/state.json");

async function main() {
  const [deployer, coordinator] = await ethers.getSigners();

  const ballot = await deployBallot(deployer, coordinator.address);

  const coordinatorKeypair = new Keypair();
  const maci = await deployMaci(deployer, ballot.address, ballot.address, coordinatorKeypair.pubKey.asContractParam());
  console.log("MACI deployed to: ", maci.address);

  // write file
  const state = {
    maci: maci.address,
    coordinator: {
      pk: coordinatorKeypair.pubKey.serialize(),
    },
  };

  fs.writeFileSync(filePath, JSON.stringify(state));
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

const deployMaci = async (
  deployer: SignerWithAddress,
  signUpGatekeeperAddress: string,
  initialVoiceCreditProxy: string,
  coordinatorPubKey: {
    x: string;
    y: string;
  },
  stateTreeDepth?: number,
  messageTreeDepth?: number,
  voteOptionTreeDepth?: number,
  quadVoteTallyBatchSize?: number,
  messageBatchSize?: number,
  signUpDurationInSeconds?: number,
  votingDurationInSeconds?: number,
  circuit = "test",
  quiet = false,
) => {
  let poseidonT3;
  let poseidonT6;

  log("Deploying Poseidon T3", quiet);
  const PoseidonT3 = await ethers.getContractFactory(":PoseidonT3", deployer);
  poseidonT3 = await PoseidonT3.deploy();

  log("Deploying Poseidon T6", quiet);
  const PoseidonT6 = await ethers.getContractFactory(":PoseidonT6", deployer);
  poseidonT6 = await PoseidonT6.deploy();

  let batchUstVerifier;
  let qvtVerifier;

  log("Deploying batchUstVerifier", quiet);
  const BatchUstVerifier = await ethers.getContractFactory(CIRCUITS[circuit].batchUstVerifier, deployer);
  batchUstVerifier = await BatchUstVerifier.deploy();

  log("Deploying QvtVerifier", quiet);
  const QvtVerifier = await ethers.getContractFactory(CIRCUITS[circuit].qvtVerifier, deployer);
  qvtVerifier = await QvtVerifier.deploy();

  log("Deploying MACI", quiet);

  const maciParameters = new MaciParameters({
    batchUstVerifier: batchUstVerifier.address,
    qvtVerifier: qvtVerifier.address,
    ...CIRCUITS[circuit].treeDepths,
  });

  stateTreeDepth = maciParameters.stateTreeDepth;
  messageTreeDepth = maciParameters.messageTreeDepth;
  voteOptionTreeDepth = maciParameters.voteOptionTreeDepth;
  quadVoteTallyBatchSize = maciParameters.tallyBatchSize;
  messageBatchSize = maciParameters.messageBatchSize;
  signUpDurationInSeconds = maciParameters.signUpDuration;
  votingDurationInSeconds = maciParameters.votingDuration;

  const maxUsers = (BigInt(2 ** stateTreeDepth) - BigInt(1)).toString();
  const maxMessages = (BigInt(2 ** messageTreeDepth) - BigInt(1)).toString();
  const maxVoteOptions = (BigInt(5 ** voteOptionTreeDepth) - BigInt(1)).toString();

  const maciLibraries: Libraries = {
    "maci-contracts/sol/Poseidon.sol:PoseidonT3": poseidonT3.address,
    "maci-contracts/sol/Poseidon.sol:PoseidonT6": poseidonT6.address,
  };

  const MACI = (await ethers.getContractFactory("contracts/MACI.sol:MACI", {
    signer: deployer,
    libraries: maciLibraries,
  })) as MACI__factory;

  const maci = await MACI.deploy(
    {
      stateTreeDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
    },
    {
      tallyBatchSize: quadVoteTallyBatchSize,
      messageBatchSize: messageBatchSize,
    },
    {
      maxUsers,
      maxMessages,
      maxVoteOptions,
    },
    signUpGatekeeperAddress,
    batchUstVerifier.address,
    qvtVerifier.address,
    signUpDurationInSeconds,
    votingDurationInSeconds,
    initialVoiceCreditProxy,
    coordinatorPubKey,
    deployer.address, // typechain is coordinator's address. Is deployer the coordinator?
  );

  await maci.deployed();

  return maci;
};
