/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Alert from './Alert'

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    children: 'This is an alert message.',
  },
} as Meta

const Template = (args: any) => <Alert {...args} />

export const Default = Template.bind({})

export const Dark = Template.bind({})
;(Dark as any).args = { color: 'dark' }
;(Dark as any).parameters = {
  backgrounds: {
    default: 'Light',
  },
}

export const Light = Template.bind({})
;(Light as any).args = { color: 'light' }

export const Primary = Template.bind({})
;(Primary as any).args = { color: 'primary' }

export const Secondary = Template.bind({})
;(Secondary as any).args = { color: 'secondary' }

export const Positive = Template.bind({})
;(Positive as any).args = { color: 'positive' }

export const Negative = Template.bind({})
;(Negative as any).args = { color: 'negative' }
