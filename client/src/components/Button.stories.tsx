/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { action: { action: 'action executed' } },
  args: {
    label: 'Button',
    icon: faExclamationCircle,
    description: 'Description',
  },
} as Meta

const Template = (args: any) => <Button {...args} />

export const Default = Template.bind({})

export const Dark = Template.bind({})
;(Dark as any).args = { color: 'dark' }
;(Dark as any).parameters = {
  backgrounds: {
    default: 'Light',
  },
}
export const Light = Template.bind({})
;(Light as any).args = { color: 'light' }
export const Primary = Template.bind({})
;(Primary as any).args = { color: 'primary' }
export const Secondary = Template.bind({})
;(Secondary as any).args = { color: 'secondary' }
export const Positive = Template.bind({})
;(Positive as any).args = { color: 'positive' }
;(Positive as any).parameters = {
  backgrounds: {
    default: 'Light',
  },
}
export const Negative = Template.bind({})
;(Negative as any).args = { color: 'negative' }
;(Negative as any).parameters = {
  backgrounds: {
    default: 'Light',
  },
}

export const Medium = Template.bind({})
;(Medium as any).args = { size: 'm' }
export const Large = Template.bind({})
;(Large as any).args = { size: 'l' }
export const ExtraLarge = Template.bind({})
;(ExtraLarge as any).args = { size: 'xl' }

export const NoIcon = Template.bind({})
;(NoIcon as any).args = { icon: null }

export const NoLabel = Template.bind({})
;(NoLabel as any).args = { label: null }

export const Link = Template.bind({})
;(Link as any).args = { link: true }

export const Active = Template.bind({})
;(Active as any).args = { active: true }

export const Disabled = Template.bind({})
;(Disabled as any).args = { disabled: true }

export const ActiveDisabled = Template.bind({})
;(ActiveDisabled as any).args = { active: true, disabled: true }
