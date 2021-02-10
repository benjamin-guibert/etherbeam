import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import TokenChart from './TokenChart'

export default {
  title: 'Components/Blockchain/TokenChart',
  component: TokenChart,
  args: {
    pair: 'UNIWETH',
    height: 300,
  },
} as Meta

const Template = (args) => <TokenChart {...args} />

export const Default = Template.bind({})

export const NoPair = Template.bind({})
NoPair.args = { pair: null }
