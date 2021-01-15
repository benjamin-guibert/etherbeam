import { BigNumber } from 'ethers'
import {
  AddressType,
  HistoryTime,
  Token,
  Transaction,
  TransactionStatus,
  TransactionActionType,
  TransactionAction,
  TransactionActionDirection,
  TransactionMethodParameterType,
} from 'libraries/ethereum/types'

export const createTransaction = (
  hash = '0x0000000000000000000000000000000000000000000000000000000000000001'
): Transaction => {
  return {
    blockNumber: 1000,
    dateTime: new Date(2020, 4, 5, 3, 45, 56),
    address: {
      hash,
      type: AddressType.Transaction,
      url: 'https://etherscan.io/tx/' + hash,
    },
    status: TransactionStatus.Pending,
    from: {
      hash: '0x0000000000000000000000000000000000000111',
      type: AddressType.Wallet,
      url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111"',
      label: 'My Wallet',
    },
    to: {
      hash: '0x0000000000000000000000000000000000000222',
      type: AddressType.Unknown,
      url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
    },
    value: BigNumber.from('40000000'),
    gas: {
      unitPrice: BigNumber.from('100'),
      limit: 10000,
    },
    action: {
      contract: {
        hash: '0x0000000000000000000000000000000000000222',
        type: AddressType.Token,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
        label: 'Token (TKN)',
      },
      name: 'event',
      parameters: [
        {
          name: 'paramAddress',
          rawType: 'address',
          type: TransactionMethodParameterType.Address,
          value: {
            hash: '0x0000000000000000000000000000000000000111',
            type: AddressType.Wallet,
            url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
            label: 'My Wallet',
          },
        },
      ],
    },
  }
}

export const createToken = (hash: string): Token => {
  return {
    hash,
    type: AddressType.Token,
    url: 'https://etherscan.io/address/' + hash,
    label: 'Token (TKN)',
    name: 'Token',
    symbol: 'TKN',
    decimals: 18,
    price: BigNumber.from('2000'),
    priceHistory: [
      { time: HistoryTime.Hour, price: BigNumber.from('1000'), ratio: 2.0 },
      { time: HistoryTime.Day, price: BigNumber.from('4000'), ratio: 0.5 },
      { time: HistoryTime.Week, price: BigNumber.from('8000'), ratio: 0.25 },
      { time: HistoryTime.Month, price: BigNumber.from('2000'), ratio: 1.0 },
      { time: HistoryTime.Year, price: BigNumber.from('500'), ratio: 4.0 },
    ],
    actions: [],
  }
}

export const createTokenAction = (
  type: TransactionActionType,
  direction: TransactionActionDirection
): TransactionAction => {
  return {
    transaction: {
      address: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
        type: AddressType.Transaction,
        url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
      },
      status: TransactionStatus.Pending,
      dateTime: new Date(2020, 4, 5, 11, 22, 33),
      blockNumber: 1000,
      gas: {},
    },
    index: 0,
    type,
    direction,
    holder: {
      hash: '0x0000000000000000000000000000000000000111',
      type: AddressType.Wallet,
      url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      label: 'My Wallet',
    },
    fromAddress: {
      hash: '0x0000000000000000000000000000000000000111',
      type: AddressType.Token,
      url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
      label: 'Token 1 (TKN-1)',
      name: 'Token 1',
      symbol: 'TKN-1',
      decimals: 18,
    },
    fromAmount: BigNumber.from('10000000'),
    toAddress: {
      hash: '0x0000000000000000000000000000000000000222',
      type: AddressType.Token,
      url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
      label: 'Token 2 (TKN-2)',
      name: 'Token 2',
      symbol: 'TKN-2',
      decimals: 18,
    },
    toAmount: BigNumber.from('20000000'),
  }
}
