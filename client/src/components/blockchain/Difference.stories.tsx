/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Template = (args: any) => <Difference {...args} />

export const Default = Template.bind({})

export const Neutral = Template.bind({})
;(Neutral as any).args = { ratio: 1.0 }

export const Positive = Template.bind({})
;(Positive as any).args = { ratio: 1.5 }

export const Negative = Template.bind({})
;(Negative as any).args = { ratio: 0.5 }

export const Hour = Template.bind({})
;(Hour as any).args = { time: HistoryTime.Hour }

export const Day = Template.bind({})
;(Day as any).args = { time: HistoryTime.Day }

export const Week = Template.bind({})
;(Week as any).args = { time: HistoryTime.Week }

export const Month = Template.bind({})
;(Month as any).args = { time: HistoryTime.Month }

export const Year = Template.bind({})
;(Year as any).args = { time: HistoryTime.Year }
