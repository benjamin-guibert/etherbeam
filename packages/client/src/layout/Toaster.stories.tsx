import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Toaster from './Toaster'

export default {
  title: 'Layout/Toaster',
  component: Toaster,
  args: {
    toasts: [
      { type: 'info', content: 'This is an information message.' },
      { type: 'success', content: 'This is a success message.' },
      { type: 'error', content: 'This is an error message.' },
    ],
  },
} as Meta

const Template = (args) => <Toaster {...args} />

export const Default = Template.bind({})
