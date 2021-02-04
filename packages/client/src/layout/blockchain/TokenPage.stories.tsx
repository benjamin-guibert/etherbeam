import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'
import { AddressType, HistoryTime } from '../../libraries/ethereum/types'
import TokenPage from './TokenPage'

export default {
  title: 'Layout/Blockchain/TokenPage',
  component: TokenPage,
  args: {
    token: {
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
      website: 'http://website',
      whitepaper: 'http://whitepaper',
      github: 'http://github',
      LinkedIn: 'http://linkedin',
      facebook: 'http://facebook',
      reddit: 'http://reddit',
      twitter: 'http://twitter',
      telegram: 'http://telegram',
      discord: 'http://discord',
    },
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
