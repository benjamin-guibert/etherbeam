/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Header from './Header'

export default {
  title: 'Layout/Header',
  component: Header,
} as Meta

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
