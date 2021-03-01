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
    input: '',
    blockHash: null,
    nonce: 0,
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
    blockHash: '',
    blockNumber: 0,
    transactionIndex: 0,
    cumulativeGasUsed: 0,
    logsBloom: '',
  }
}

export const createWeb3Block = (number = 1000): BlockTransactionObject => {
  return {
    number,
    timestamp: new Date(2020, 4, 5, 11, 22, 33).getTime() / 1000,
    transactions: [createWeb3Transaction()],
    gasLimit: 0,
    gasUsed: 0,
    hash: '',
    parentHash: '',
    nonce: '',
    size: 0,
    difficulty: 0,
    totalDifficulty: 0,
    uncles: [],
    sha3Uncles: '',
    logsBloom: '',
    transactionRoot: '',
    stateRoot: '',
    receiptRoot: '',
    miner: '',
    extraData: '',
  }
}
