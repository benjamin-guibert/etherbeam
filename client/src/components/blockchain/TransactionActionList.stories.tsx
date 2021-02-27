import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  AddressType,
  TransactionActionDirection,
  TransactionActionType,
  TransactionStatus,
} from '../../libraries/types'
import { BigNumber } from 'ethers'
import TransactionActionList from './TransactionActionList'

const actions = [
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
]

export default {
  title: 'Components/Blockchain/TransactionActionList',
  component: TransactionActionList,
  args: {
    actions,
  },
} as Meta

const Template = (args) => <TransactionActionList {...args} />

export const Default = Template.bind({})
