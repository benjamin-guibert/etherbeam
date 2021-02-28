/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Title from './Title'

export default {
  title: 'Components/Title',
  component: Title,
} as Meta

const Template = (args: any) => <Title {...args} />

export const Default = Template.bind({})

export const LabelBreakpoint = Template.bind({})
;(LabelBreakpoint as any).args = { labelBreakpoint: 'xs' }
