/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Toast from './Toast'

export default {
  title: 'Components/Toast',
  component: Toast,
  args: {
    children: 'This is a toast message.',
  },
} as Meta

const Template = (args: any) => <Toast {...args} />

export const Default = Template.bind({})

export const Info = Template.bind({})
;(Info as any).args = { type: 'info' }

export const Success = Template.bind({})
;(Success as any).args = { type: 'success' }

export const Error = Template.bind({})
;(Error as any).args = { type: 'error' }
