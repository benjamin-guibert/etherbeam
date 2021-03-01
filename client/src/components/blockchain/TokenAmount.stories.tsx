/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BigNumber } from 'ethers'
import { AddressType } from '../../libraries/types'
import TokenAmount from './TokenAmount'

const amount = BigNumber.from('1234567890000000000000')
const token = {
  hash: '0x0000000000000000000000000000000000000111',
  type: AddressType.Token,
  label: 'Token (TKN)',
  name: 'Token',
  symbol: 'TKN',
  decimals: 18,
  priceHistory: [],
  url: null,
}

export default {
  title: 'Components/Blockchain/TokenAmount',
  component: TokenAmount,
  args: {
    amount,
    token,
  },
} as Meta

const Template = (args: any) => <TokenAmount {...args} />

export const Default = Template.bind({})

export const Ether = Template.bind({})
;(Ether as any).args = { token: null }

export const AmountPrintOptions = Template.bind({})
;(AmountPrintOptions as any).args = { amountPrintOptions: { decimals: 10, forcedDecimals: true } }

export const NoSymbol = Template.bind({})
;(NoSymbol as any).args = { noSymbol: true }

export const NoBadge = Template.bind({})
;(NoBadge as any).args = { noBadge: true }
