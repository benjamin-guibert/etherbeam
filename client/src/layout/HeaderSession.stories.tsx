/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { UserType } from '../libraries/types'
import HeaderSession from './HeaderSession'

const user = {
  name: 'User Name',
  email: 'user@email.com',
  type: UserType.User,
}

const administrator = {
  name: 'Administrator',
  email: 'admin@email.com',
  type: UserType.Administrator,
}

export default {
  title: 'Layout/HeaderSession',
  component: HeaderSession,
  argTypes: { signIn: { action: 'signed in' }, signOut: { action: 'signed out' } },
  args: { currentUser: user },
} as Meta

const Template = (args) => <HeaderSession {...args} />

export const Default = Template.bind({})

export const Administrator = Template.bind({})
Administrator.args = { currentUser: administrator }

export const Unauthentified = Template.bind({})
Unauthentified.args = { currentUser: null }
