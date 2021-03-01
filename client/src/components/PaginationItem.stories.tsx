/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Template = (args: any) => <PaginationItem {...args} />

export const Default = Template.bind({})

export const First = Template.bind({})
;(First as any).args = { page: 'first' }

export const Previous = Template.bind({})
;(Previous as any).args = { page: 'previous' }

export const Ellipsis = Template.bind({})
;(Ellipsis as any).args = { page: 'ellipsis' }

export const Next = Template.bind({})
;(Next as any).args = { page: 'next' }

export const Last = Template.bind({})
;(Last as any).args = { page: 'last' }

export const Selected = Template.bind({})
;(Selected as any).args = { selected: true }

export const Disabled = Template.bind({})
;(Disabled as any).args = { disabled: true }

export const SelectedDisabled = Template.bind({})
;(SelectedDisabled as any).args = { selected: true, disabled: true }
