import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Title from './Title'

export default {
  title: 'Components/Title',
  component: Title,
} as Meta

const Template = (args) => <Title {...args} />

export const Default = Template.bind({})

export const LabelBreakpoint = Template.bind({})
LabelBreakpoint.args = { labelBreakpoint: 'xs' }
