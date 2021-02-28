/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Badge from './Badge'
import List from './List'
import ListItem from './ListItem'

export default {
  title: 'Components/List',
  component: List,
  args: {
    children: (
      <>
        <ListItem>
          <Badge>Item 1</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 2</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 3</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 4</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 5</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 6</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 7</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 8</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 9</Badge>
        </ListItem>
        <ListItem>
          <Badge>Item 10</Badge>
        </ListItem>
      </>
    ),
  },
} as Meta

const Template = (args: any) => <List {...args} />

export const Default = Template.bind({})

export const Horizontal = Template.bind({})
;(Horizontal as any).args = { horizontal: true }

export const Center = Template.bind({})
;(Center as any).args = { horizontal: true, center: true }
