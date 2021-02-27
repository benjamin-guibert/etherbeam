import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Time from './Time'

export default {
  title: 'Components/Time',
  component: Time,
  args: {
    dateTime: new Date(2020, 4, 5, 11, 22, 33),
  },
} as Meta

const Template = (args) => <Time {...args} />

export const Default = Template.bind({})
