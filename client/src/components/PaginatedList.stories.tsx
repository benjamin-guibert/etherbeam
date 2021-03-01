/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import * as TableStories from './Table.stories'
import PaginatedList from './PaginatedList'

export default {
  title: 'Components/PaginatedList',
  component: PaginatedList,
  argTypes: { setPage: { action: 'page clicked' } },
  args: {
    pagination: { totalPages: 10, currentPage: 5 },
    children: <TableStories.Default />,
  },
} as Meta

const Template = (args: any) => <PaginatedList {...args} />

export const Default = Template.bind({})

export const SinglePage = Template.bind({})
;(SinglePage as any).args = { pagination: { totalPages: 1, currentPage: 1 } }
