import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'
import {
  AddressType,
  HistoryTime,
  TransactionActionDirection,
  TransactionActionType,
  TransactionStatus,
} from '../../libraries/types'
import TokenPage from './TokenPage'

const token = {
  hash: '0x0000000000000000000000000000000000000111',
  type: AddressType.Token,
  label: 'Token (TKN)',
  name: 'Token',
  symbol: 'TKN',
  decimals: 18,
  chartPair: 'UNIWETH',
  price: BigNumber.from('1234567890123456789'),
  priceHistory: [
    { time: HistoryTime.Hour, ratio: 0.9 },
    { time: HistoryTime.Day, ratio: 1.8 },
    { time: HistoryTime.Week, ratio: 1 },
    { time: HistoryTime.Month, ratio: 0.6 },
    { time: HistoryTime.Year, ratio: 1.7 },
  ],
  url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  website: 'http://website',
  whitepaper: 'http://whitepaper',
  github: 'http://github',
  LinkedIn: 'http://linkedin',
  facebook: 'http://facebook',
  reddit: 'http://reddit',
  twitter: 'http://twitter',
  telegram: 'http://telegram',
  discord: 'http://discord',
  actions: [
    {
      index: 0,
      transaction: {
        address: {
          hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
          type: AddressType.Transaction,
          url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
        },
        status: TransactionStatus.Validated,
        dateTime: new Date(2020, 4, 5, 11, 22, 33),
        blockNumber: 1000,
        gas: null,
      },
      type: TransactionActionType.Swap,
      direction: TransactionActionDirection.Buy,
      holder: {
        hash: '0x0000000000000000000000000000000000000222',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
      },
      toAddress: {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Token,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
        label: 'Token (TKN)',
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
      },
      fromAmount: BigNumber.from('123456789000000000'),
      toAmount: BigNumber.from('1234567890000000000'),
    },
    {
      index: 0,
      transaction: {
        address: {
          hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
          type: AddressType.Transaction,
          url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
        },
        status: TransactionStatus.Validated,
        dateTime: new Date(2020, 4, 5, 11, 22, 33),
        blockNumber: 1000,
        gas: null,
      },
      type: TransactionActionType.Swap,
      direction: TransactionActionDirection.Sell,
      holder: {
        hash: '0x0000000000000000000000000000000000000222',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
      },
      fromAddress: {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Token,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
        label: 'Token (TKN)',
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
      },
      fromAmount: BigNumber.from('1234567890000000000'),
      toAmount: BigNumber.from('123456789000000000'),
    },
    {
      index: 0,
      transaction: {
        address: {
          hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
          type: AddressType.Transaction,
          url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
        },
        status: TransactionStatus.Validated,
        dateTime: new Date(2020, 4, 5, 11, 22, 33),
        blockNumber: 1000,
        gas: null,
      },
      type: TransactionActionType.Transfer,
      direction: TransactionActionDirection.Buy,
      holder: {
        hash: '0x0000000000000000000000000000000000000222',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
      },
      fromAddress: {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Token,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
        label: 'Token (TKN)',
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
      },
      fromAmount: BigNumber.from('12345678900000000000'),
      toAddress: {
        hash: '0x0000000000000000000000000000000000000333',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000333',
      },
    },
  ],
}

export default {
  title: 'Layout/Blockchain/TokenPage',
  component: TokenPage,
  args: {
    token,
  },
} as Meta

const Template = (args) => <TokenPage {...args} />

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.args = { token: undefined, loading: true }

export const Unknown = Template.bind({})
Unknown.args = { token: undefined, alert: 'This token is unknown.' }

export const NoPrice = Template.bind({})
NoPrice.args = {
  token: {
    ...token,
    price: undefined,
    priceHistory: [],
  },
}

export const NoChartPair = Template.bind({})
NoChartPair.args = {
  token: { ...token, chartPair: undefined },
}
