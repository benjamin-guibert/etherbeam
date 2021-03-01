/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'
import { AddressType, HistoryTime } from '../../libraries/types'
import Table from '../Table'
import TokenRow from './TokenRow'

const token = {
  hash: '0x0000000000000000000000000000000000000111',
  type: AddressType.Token,
  label: 'Token (TKN)',
  name: 'Token',
  symbol: 'TKN',
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
}

export default {
  title: 'Components/Blockchain/TokenRow',
  component: TokenRow,
  decorators: [
    (Story) => (
      <Table>
        <tbody>
          <Story />
        </tbody>
      </Table>
    ),
  ],
  argTypes: { goToTokenPage: { action: 'Go to token page' } },
  args: {
    token,
  },
} as Meta

const Template = (args: any) => <TokenRow {...args} />

export const Default = Template.bind({})

export const NoPrice = Template.bind({})
;(NoPrice as any).args = {
  token: {
    hash: '0x0000000000000000000000000000000000000111',
    type: AddressType.Token,
    label: 'Token (TKN)',
    name: 'Token',
    symbol: 'TKN',
    decimals: 18,
    price: undefined,
    priceHistory: [],
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  },
}

export const NoPriceHistory = Template.bind({})
;(NoPriceHistory as any).args = {
  token: {
    hash: '0x0000000000000000000000000000000000000111',
    type: AddressType.Token,
    label: 'Token (TKN)',
    name: 'Token',
    symbol: 'TKN',
    decimals: 18,
    price: BigNumber.from('1234567890123456789'),
    priceHistory: [],
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  },
}
