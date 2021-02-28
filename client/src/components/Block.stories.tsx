/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Template = (args: any) => <Block {...args} />

export const Default = Template.bind({})
