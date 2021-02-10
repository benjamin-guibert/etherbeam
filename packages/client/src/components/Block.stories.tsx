import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Block from './Block'

export default {
  title: 'Components/Block',
  component: Block,
  args: {
    children: 'Content',
  },
} as Meta

const Template = (args) => <Block {...args} />

export const Default = Template.bind({})
