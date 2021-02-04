import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import List from './List'
import PaginationItem from './PaginationItem'

export default {
  title: 'Components/PaginationItem',
  component: PaginationItem,
  decorators: [
    (Story) => (
      <List horizontal>
        <Story />
      </List>
    ),
  ],
  argTypes: { action: { action: 'action executed' } },
  args: { page: 5 },
} as Meta

const Template = (args) => <PaginationItem {...args} />

export const Default = Template.bind({})

export const First = Template.bind({})
First.args = { page: 'first' }

export const Previous = Template.bind({})
Previous.args = { page: 'previous' }

export const Ellipsis = Template.bind({})
Ellipsis.args = { page: 'ellipsis' }

export const Next = Template.bind({})
Next.args = { page: 'next' }

export const Last = Template.bind({})
Last.args = { page: 'last' }

export const Selected = Template.bind({})
Selected.args = { selected: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const SelectedDisabled = Template.bind({})
SelectedDisabled.args = { selected: true, disabled: true }
