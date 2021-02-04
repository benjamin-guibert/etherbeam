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

const Template = (args) => <Alert {...args} />

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = { color: 'dark' }
Dark.parameters = {
  backgrounds: {
    default: 'Light',
  },
}

export const Light = Template.bind({})
Light.args = { color: 'light' }

export const Primary = Template.bind({})
Primary.args = { color: 'primary' }

export const Secondary = Template.bind({})
Secondary.args = { color: 'secondary' }

export const Positive = Template.bind({})
Positive.args = { color: 'positive' }

export const Negative = Template.bind({})
Negative.args = { color: 'negative' }
