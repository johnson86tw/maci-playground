import hre, { ethers } from 'hardhat'
import { MACI } from '../typechain/MACI'
import { processAndTallyWithoutProofs } from 'maci-cli'

import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../', '/state.json')

let maciAddress = ''
if (hre.network.name === 'localhost') {
  maciAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
}

type Coordinator = {
  sk: string
  pk: string
}

async function main() {
  const [deployer, coordinator] = await ethers.getSigners()

  if (!fs.existsSync(filePath)) {
    throw new Error('Error: state.json not found')
  }

  const state = JSON.parse(fs.readFileSync(filePath).toString())
  const coordinatorState = state.coordinator as Coordinator

  const maci = (await ethers.getContractAt('contracts/MACI.sol:MACI', maciAddress, coordinator)) as MACI

  const results = await processAndTallyWithoutProofs({
    contract: maciAddress,
    eth_privkey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', // coordinator eth privkey
    eth_provider: 'http://127.0.0.1:8545/',
    privkey: coordinatorState.sk,
    tally_file: 'tally.json',
  })
  if (!results) {
    throw new Error('Failed to tally votes')
  }

  console.log(results)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
