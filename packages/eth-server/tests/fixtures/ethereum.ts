import { EthereumData } from 'libraries/ethereum'
import { sanitizeHash } from 'libraries/helpers'
import { ContractType, Transaction, TransactionStatus, Token, Contract } from 'libraries/types'
import Web3 from 'web3'
import { createServerData } from './server'

export const createEthereumData = (): EthereumData => {
  return {
    serverData: createServerData(),
    web3: ({
      eth: {
        getBlock: jest.fn(),
        getTransaction: jest.fn(),
        getTransactionReceipt: jest.fn(),
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown) as Web3,
    web3Pool: ({
      eth: {
        getBlock: jest.fn(),
        getTransaction: jest.fn(),
        getTransactionReceipt: jest.fn(),
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown) as Web3,
    ethersProvider: undefined,
    contracts: [],
    newBlocksSubscription: null,
    fetchingTransactionReceipts: false,
    fetchingTokenPrices: false,
    pendingTransactionsSubscription: null,
  }
}

export const createContract = (hash = '0x0A0000000000000000000000000000000000111'): Contract => {
  return {
    sanitizedHash: sanitizeHash(hash),
    hash,
    type: ContractType.Contract,
    label: 'Contract',
    abi: '[]',
  }
}

export const createToken = (hash = '0x0A00000000000000000000000000000000000111'): Token => {
  return {
    sanitizedHash: sanitizeHash(hash),
    hash,
    type: ContractType.Token,
    label: 'Token (TKN)',
    abi: '[]',
    decimals: 18,
    price: '1000',
  }
}

export const createTransaction = (
  hash = '0x0000000000000000000000000000000000000000000000000000000000000001'
): Transaction => {
  return {
    hash,
    blockNumber: 1000,
    dateTime: new Date(2020, 4, 5, 11, 22, 33),
    status: TransactionStatus.mined,
    from: '0x0000000000000000000000000000000000000111',
    to: '0x0000000000000000000000000000000000000222',
    value: Web3.utils.toBN('1000000000000000000'),
    gasUnitPrice: Web3.utils.toBN('500'),
    gasLimit: 10000,
    systemLogs: [],
  }
}
