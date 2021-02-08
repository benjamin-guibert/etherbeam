/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddressType } from '../../libraries/ethereum/types'
import AddressItem from './AddressItem'

const address = {
  hash: '0x0000000000000000000000000000000000000111',
  label: null,
  type: AddressType.Unknown,
  url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
}

export default {
  title: 'Components/Blockchain/AddressItem',
  component: AddressItem,
  args: {
    address,
  },
} as Meta

const Template = (args) => <AddressItem {...args} />

export const Default = Template.bind({})

export const Flag = Template.bind({})
Flag.args = {
  address: {
    hash: '0x0000000000000000000000000000000000000111',
    label: 'Wallet',
    type: AddressType.Wallet,
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  },
}

export const Short = Template.bind({})
Short.args = {
  short: true,
}

export const NoFlag = Template.bind({})
NoFlag.args = {
  address: {
    hash: '0x0000000000000000000000000000000000000111',
    label: 'Wallet',
    type: AddressType.Wallet,
    url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
  },
  noFlag: true,
}
