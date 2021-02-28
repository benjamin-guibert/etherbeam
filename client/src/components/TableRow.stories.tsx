/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import TableRow from './TableRow'
import Table from './Table'

export default {
  title: 'Components/TableRow',
  component: TableRow,
  decorators: [
    (Story) => (
      <Table>
        <tbody>
          <Story />
        </tbody>
      </Table>
    ),
  ],
  argTypes: { action: { action: 'action executed' } },
  args: {
    children: (
      <>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </>
    ),
  },
} as Meta

const Template = (args: any) => <TableRow {...args} />

export const Default = Template.bind({})

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

export const Clickable = Template.bind({})
;(Clickable as any).args = { clickable: true }

export const Active = Template.bind({})
;(Active as any).args = { active: true }

export const ClickableActive = Template.bind({})
;(ClickableActive as any).args = { clickable: true, active: true }

export const Disabled = Template.bind({})
;(Disabled as any).args = { disabled: true }

export const ClickableDisabled = Template.bind({})
;(ClickableDisabled as any).args = { clickable: true, disabled: true }

export const ActiveDisabled = Template.bind({})
;(ActiveDisabled as any).args = { active: true, disabled: true }

export const ClickableActiveDisabled = Template.bind({})
;(ClickableActiveDisabled as any).args = { clickable: true, active: true, disabled: true }
