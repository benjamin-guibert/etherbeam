/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddressType } from '../../libraries/types'
import AddressFlag from './AddressFlag'

const address = {
  hash: '0x0000000000000000000000000000000000000111',
  label: 'Address',
  type: AddressType.Unknown,
  url: null,
}

export default {
  title: 'Components/Blockchain/AddressFlag',
  component: AddressFlag,
  args: {
    address,
  },
} as Meta

const Template = (args) => <AddressFlag {...args} />

export const Default = Template.bind({})

export const Wallet = Template.bind({})
Wallet.args = {
  address: {
    hash: '0x0000000000000000000000000000000000000111',
    label: 'Wallet',
    type: AddressType.Wallet,
    url: null,
  },
}

export const Contract = Template.bind({})
Contract.args = {
  address: {
    hash: '0x0000000000000000000000000000000000000111',
    label: 'Contract',
    type: AddressType.Contract,
    url: null,
  },
}

export const Token = Template.bind({})
Token.args = {
  address: {
    hash: '0x0000000000000000000000000000000000000111',
    label: 'Token',
    type: AddressType.Token,
    url: null,
  },
}
