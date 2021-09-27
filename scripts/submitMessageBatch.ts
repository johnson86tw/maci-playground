import hre, { ethers } from 'hardhat'
import { MACI } from '../typechain/MACI'
import { Command, Keypair, Message, PrivKey, PubKey } from 'maci-domainobjs'
import fs from 'fs'
import path from 'path'
import { createMessage } from '../utils/maci'
import { BigNumber } from '@ethersproject/bignumber'

const filePath = path.join(__dirname, '../', '/state.json')

let maci: MACI
let maciAddress = ''
if (hre.network.name === 'localhost') {
  maciAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
}

const voterIndex = 0

type Voter = {
  sk: string
  stateIndex: string
}

type Coordinator = {
  pk: string
}

async function main() {
  if (!fs.existsSync(filePath)) {
    throw new Error('Error: state.json not found')
  }

  const state = JSON.parse(fs.readFileSync(filePath).toString())

  const voter = state.voters[voterIndex] as Voter
  const coordinator = state.coordinator as Coordinator

  const voterKeypair = new Keypair(PrivKey.unserialize(voter.sk))
  console.log('stateIndex: ', voter.stateIndex)
  console.log('Private key: ', voterKeypair.privKey.serialize())
  console.log('Public key: ', voterKeypair.pubKey.serialize())

  const votes = [
    [0, 2],
    [1, 9],
  ]

  const messages: Message[] = []
  const encPubKeys: PubKey[] = []

  let nonce = 1
  for (const [voteOptionIndex, voiceCredits] of votes) {
    const [message, encPubKey] = createMessage(
      Number(voter.stateIndex),
      voterKeypair,
      null,
      PubKey.unserialize(coordinator.pk),
      voteOptionIndex,
      BigNumber.from(voiceCredits),
      nonce,
    )
    messages.push(message)
    encPubKeys.push(encPubKey)
    nonce += 1
  }

  const [, , alice] = await ethers.getSigners()
  maci = (await ethers.getContractAt('contracts/MACI.sol:MACI', maciAddress, alice)) as MACI

  for (let i = votes.length - 1; i >= 0; i--) {
    // @ts-ignore
    const tx = await maci.publishMessage(messages[i].asContractParam(), encPubKeys[i].asContractParam())
    await tx.wait()
  }

  // This will fail.
  // for (let i = 0; i < votes.length; i++) {
  //   // @ts-ignore
  //   const tx = await maci.publishMessage(messages[i].asContractParam(), encPubKeys[i].asContractParam())
  //   await tx.wait()
  // }

  console.log('numMessages: ', (await maci.numMessages()).toString())
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
