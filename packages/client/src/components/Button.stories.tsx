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

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})

export const Dark = Template.bind({})
Dark.args = { color: 'dark' }
Dark.parameters = {
  backgrounds: {
    default: 'Light',
  },
}
export const Light = Template.bind({})
Light.args = { color: 'light' }
export const Primary = Template.bind({})
Primary.args = { color: 'primary' }
export const Secondary = Template.bind({})
Secondary.args = { color: 'secondary' }
export const Positive = Template.bind({})
Positive.args = { color: 'positive' }
Positive.parameters = {
  backgrounds: {
    default: 'Light',
  },
}
export const Negative = Template.bind({})
Negative.args = { color: 'negative' }
Negative.parameters = {
  backgrounds: {
    default: 'Light',
  },
}

export const Medium = Template.bind({})
Medium.args = { size: 'm' }
export const Large = Template.bind({})
Large.args = { size: 'l' }
export const ExtraLarge = Template.bind({})
ExtraLarge.args = { size: 'xl' }

export const NoIcon = Template.bind({})
NoIcon.args = { icon: null }

export const NoLabel = Template.bind({})
NoLabel.args = { label: null }

export const Link = Template.bind({})
Link.args = { link: true }

export const Active = Template.bind({})
Active.args = { active: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const ActiveDisabled = Template.bind({})
ActiveDisabled.args = { active: true, disabled: true }
