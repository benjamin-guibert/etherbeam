import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import TokenPriceHistory from './TokenPriceHistory'
import { HistoryTime } from '../../libraries/ethereum/types'

const priceHistory = [
  {
    time: HistoryTime.Hour,
    price: null,
    ratio: 1.2,
  },
  {
    time: HistoryTime.Day,
    price: null,
    ratio: 0.6,
  },
  {
    time: HistoryTime.Week,
    price: null,
    ratio: 1.0,
  },
  {
    time: HistoryTime.Month,
    price: null,
    ratio: 0.8,
  },
  {
    time: HistoryTime.Year,
    price: null,
    ratio: 1.7,
  },
]

export default {
  title: 'Components/Blockchain/TokenPriceHistory',
  component: TokenPriceHistory,
  args: {
    priceHistory,
  },
} as Meta

const Template = (args) => <TokenPriceHistory {...args} />

export const Default = Template.bind({})
