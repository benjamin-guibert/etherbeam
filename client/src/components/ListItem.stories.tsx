/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import ListItem from './ListItem'
import List from './List'

export default {
  title: 'Components/ListItem',
  component: ListItem,
  decorators: [
    (Story) => (
      <List>
        <Story />
      </List>
    ),
  ],
  args: { children: 'Item' },
} as Meta

const Template = (args: any) => <ListItem {...args} />

export const Default = Template.bind({})
