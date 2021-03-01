/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Table from './Table'
import TableRow from './TableRow'

export default {
  title: 'Components/Table',
  component: Table,
} as Meta

const Template = (args: any) => {
  const color = args.color
  const children = (
    <>
      <thead>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </thead>
      <tbody>
        <TableRow color={color} clickable action={undefined}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
        <TableRow color={color} clickable action={undefined}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
        <TableRow color={color} clickable action={undefined}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
      </tbody>
    </>
  )

  return <Table {...args}>{children}</Table>
}

export const Default = Template.bind({})

export const Dark = Template.bind({})
;(Dark as any).args = { color: 'dark' }

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
