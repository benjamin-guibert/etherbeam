import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import EtherscanLink from './EtherscanLink'

export default {
  title: 'Components/Blockchain/EtherscanLink',
  component: EtherscanLink,
  args: {
    url: 'javascript:',
  },
} as Meta

const Template = (args) => <EtherscanLink {...args} />

export const Default = Template.bind({})

export const Medium = Template.bind({})
Medium.args = { size: 'm' }

export const Large = Template.bind({})
Large.args = { size: 'l' }

export const ExtraLarge = Template.bind({})
ExtraLarge.args = { size: 'xl' }
