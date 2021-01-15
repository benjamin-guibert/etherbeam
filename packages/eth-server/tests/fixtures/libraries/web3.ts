import { BlockTransactionObject, Transaction } from 'web3-eth'
import { TransactionReceipt } from 'web3-core'

export const createWeb3Transaction = (
  hash = '0x0a00000000000000000000000000000000000000000000000000000000000001'
): Transaction => {
  return {
    hash,
    blockNumber: 1000,
    from: '0x0a00000000000000000000000000000000000111',
    to: '0x0a00000000000000000000000000000000000222',
    value: '1000000000000000000',
    gasPrice: '500',
    gas: 10000,
    input: null,
    blockHash: null,
    nonce: null,
    transactionIndex: null,
  }
}

export const createWeb3TransactionReceipt = (
  hash = '0x0a00000000000000000000000000000000000000000000000000000000000001'
): TransactionReceipt => {
  return {
    transactionHash: hash,
    status: true,
    from: '0x0a00000000000000000000000000000000000111',
    to: '0x0a00000000000000000000000000000000000222',
    gasUsed: 9000,
    logs: [],
    blockHash: null,
    blockNumber: null,
    transactionIndex: null,
    cumulativeGasUsed: null,
    logsBloom: null,
  }
}

export const createWeb3Block = (number = 1000): BlockTransactionObject => {
  return {
    number,
    timestamp: new Date(2020, 4, 5, 11, 22, 33).getTime() / 1000,
    transactions: [createWeb3Transaction()],
    gasLimit: null,
    gasUsed: null,
    hash: null,
    parentHash: null,
    nonce: null,
    size: null,
    difficulty: null,
    totalDifficulty: null,
    uncles: null,
    sha3Uncles: null,
    logsBloom: null,
    transactionRoot: null,
    stateRoot: null,
    receiptRoot: null,
    miner: null,
    extraData: null,
  }
}
