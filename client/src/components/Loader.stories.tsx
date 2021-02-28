/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Loader from './Loader'

export default {
  title: 'Components/Loader',
  component: Loader,
} as Meta

const Template = (args: any) => <Loader {...args} />

export const Spinner = Template.bind({})
;(Spinner as any).args = { type: 'spinner' }

export const Dots = Template.bind({})
;(Dots as any).args = { type: 'dots' }
