import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Table from './Table'
import TableRow from './TableRow'

export default {
  title: 'Components/Table',
  component: Table,
} as Meta

const Template = (args) => {
  const color = args.color
  const action = (): void => null
  const children = (
    <>
      <thead>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </thead>
      <tbody>
        <TableRow color={color} clickable action={action}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
        <TableRow color={color} clickable action={action}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
        <TableRow color={color} clickable action={action}>
          <td>Cell 1</td>
          <td>Cell 2</td>
          <td>Cell 3</td>
        </TableRow>
      </tbody>
    </>
  )

  return <Table children={children} {...args} />
}

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = { color: 'dark' }

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
