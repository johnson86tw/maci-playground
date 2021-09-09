import hre, { ethers } from "hardhat";
import { Ballot } from "../typechain/Ballot";
import { MACI } from "../typechain/MACI";

let maci: MACI;
let maciAddress = "";
if (hre.network.name === "localhost") {
  maciAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
}

async function main() {
  const [, , alice, anyone] = await ethers.getSigners();

  console.log("maci address: ", maciAddress);
  maci = (await ethers.getContractAt("contracts/MACI.sol:MACI", maciAddress, anyone)) as MACI;

  console.log("numSignUps: ", (await maci.numSignUps()).toString());
  console.log("numMessages: ", (await maci.numMessages()).toString());
  console.log("signUpDeadline: ", new Date((await maci.calcSignUpDeadline()).toNumber() * 1000));
  console.log("votingDeadline: ", new Date((await maci.calcVotingDeadline()).toNumber() * 1000));
  console.log("totalVotes: ", (await maci.totalVotes()).toString());
  console.log("voteOptionsMaxLeafIndex:", (await maci.voteOptionsMaxLeafIndex()).toString());
  console.log("treeDepths: ", await maci.treeDepths());

  console.log();

  const ballot = (await ethers.getContractAt("Ballot", await maci.initialVoiceCreditProxy())) as Ballot;
  console.log("Alice's voice credit: ", (await ballot.getVoiceCredits(alice.address, [])).toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
