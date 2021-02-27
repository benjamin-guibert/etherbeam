import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'
import { AddressType, HistoryTime } from '../../libraries/types'
import TokenList from './TokenList'

const tokens = [
  {
    hash: '0x0000000000000000000000000000000000000111',
    type: AddressType.Token,
    label: 'Token.1 (TKN1)',
    name: 'Token.1',
    symbol: 'TKN1',
    decimals: 18,
    price: BigNumber.from('1234567890123456789'),
    priceHistory: [
      { time: HistoryTime.Hour, ratio: 0.9 },
      { time: HistoryTime.Day, ratio: 1.8 },
      { time: HistoryTime.Week, ratio: 1 },
      { time: HistoryTime.Month, ratio: 0.6 },
      { time: HistoryTime.Year, ratio: 1.7 },
    ],
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  },
  {
    hash: '0x0000000000000000000000000000000000000222',
    type: AddressType.Token,
    label: 'Token.2 (TKN2)',
    name: 'Token.2',
    symbol: 'TKN2',
    decimals: 18,
    price: BigNumber.from('2345678901234567891'),
    priceHistory: [
      { time: HistoryTime.Hour, ratio: 1.8 },
      { time: HistoryTime.Day, ratio: 0.9 },
      { time: HistoryTime.Week, ratio: 1.7 },
      { time: HistoryTime.Month, ratio: 1 },
      { time: HistoryTime.Year, ratio: 0.6 },
    ],
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
  },
  {
    hash: '0x0000000000000000000000000000000000000333',
    type: AddressType.Token,
    label: 'Token.3 (TKN3)',
    name: 'Token.3',
    symbol: 'TKN3',
    decimals: 18,
    price: BigNumber.from('3456789012345678912'),
    priceHistory: [
      { time: HistoryTime.Hour, ratio: 1.7 },
      { time: HistoryTime.Day, ratio: 0.6 },
      { time: HistoryTime.Week, ratio: 1.8 },
      { time: HistoryTime.Month, ratio: 1 },
      { time: HistoryTime.Year, ratio: 0.9 },
    ],
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000333',
  },
]

export default {
  title: 'Components/Blockchain/TokenList',
  component: TokenList,
  argTypes: { goToTokenPage: { action: 'Go to token page' } },
  args: {
    tokens,
  },
} as Meta

const Template = (args) => <TokenList {...args} />

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.args = { tokens: undefined, loading: true }
