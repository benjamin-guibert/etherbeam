/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { UserType } from '../libraries/types'
import Header from './Header'

const user = {
  name: 'User Name',
  email: 'user@email.com',
  type: UserType.User,
}

const administrator = {
  name: 'Admin Name',
  email: 'admin@email.com',
  type: UserType.Administrator,
}

export default {
  title: 'Layout/Header',
  component: Header,
  argTypes: { signIn: { action: 'signed in' }, signOut: { action: 'signed out' } },
  args: { currentUser: user },
} as Meta

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})

export const Administrator = Template.bind({})
Administrator.args = { currentUser: administrator }

export const Unauthentified = Template.bind({})
Unauthentified.args = { currentUser: null }
