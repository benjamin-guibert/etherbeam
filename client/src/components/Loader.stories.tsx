import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Loader from './Loader'

export default {
  title: 'Components/Loader',
  component: Loader,
} as Meta

const Template = (args) => <Loader {...args} />

export const Spinner = Template.bind({})
Spinner.args = { type: 'spinner' }

export const Dots = Template.bind({})
Dots.args = { type: 'dots' }
