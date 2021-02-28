/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import AddressHash from './AddressHash'

export default {
  title: 'Components/Blockchain/AddressHash',
  component: AddressHash,
  args: {
    hash: '0x0000000000000000000000000000000000000111',
    short: false,
  },
} as Meta

const Template = (args: any) => <AddressHash {...args} />

export const Default = Template.bind({})

export const Short = Template.bind({})
;(Short as any).args = { short: true }
