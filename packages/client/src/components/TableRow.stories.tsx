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

const Template = (args) => <TableRow {...args} />

export const Default = Template.bind({})

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

export const Clickable = Template.bind({})
Clickable.args = { clickable: true }

export const Active = Template.bind({})
Active.args = { active: true }

export const ClickableActive = Template.bind({})
ClickableActive.args = { clickable: true, active: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const ClickableDisabled = Template.bind({})
ClickableDisabled.args = { clickable: true, disabled: true }

export const ActiveDisabled = Template.bind({})
ActiveDisabled.args = { active: true, disabled: true }

export const ClickableActiveDisabled = Template.bind({})
ClickableActiveDisabled.args = { clickable: true, active: true, disabled: true }
