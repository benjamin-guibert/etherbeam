import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HistoryTime } from '../../libraries/types'
import Difference from './Difference'

export default {
  title: 'Components/Blockchain/Difference',
  component: Difference,
  args: {
    ratio: 1.0,
    time: HistoryTime.Hour,
  },
} as Meta

const Template = (args) => <Difference {...args} />

export const Default = Template.bind({})

export const Neutral = Template.bind({})
Neutral.args = { ratio: 1.0 }

export const Positive = Template.bind({})
Positive.args = { ratio: 1.5 }

export const Negative = Template.bind({})
Negative.args = { ratio: 0.5 }

export const Hour = Template.bind({})
Hour.args = { time: HistoryTime.Hour }

export const Day = Template.bind({})
Day.args = { time: HistoryTime.Day }

export const Week = Template.bind({})
Week.args = { time: HistoryTime.Week }

export const Month = Template.bind({})
Month.args = { time: HistoryTime.Month }

export const Year = Template.bind({})
Year.args = { time: HistoryTime.Year }
