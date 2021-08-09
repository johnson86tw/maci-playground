import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import fs from "fs";
import path from "path";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// Copy Poseidon artifacts from maci-contracts
task("compile", "Compiles the entire project, building all artifacts", async (_, { config }, runSuper) => {
  await runSuper();

  const poseidons = ["PoseidonT3", "PoseidonT6"];
  for (const contractName of poseidons) {
    const artifact = JSON.parse(
      fs.readFileSync(`./node_modules/maci-contracts/compiled/${contractName}.json`).toString(),
    );
    fs.writeFileSync(
      path.join(config.paths.artifacts, `${contractName}.json`),
      JSON.stringify({ ...artifact, linkReferences: {} }),
    );
    console.log(`Successfully copied ${contractName}.json`);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
    },
    compilers: [
      {
        version: "0.8.0", // only for Greeter.sol
      },
      {
        version: "0.6.12",
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true, // essential of maciFactory.ts
    },
  },
};

export default config;
