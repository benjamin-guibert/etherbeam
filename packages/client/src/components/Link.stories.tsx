import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Link from './Link'

export default {
  title: 'Components/Link',
  component: Link,
  args: {
    href: 'javascript:',
    label: 'Link',
    description: 'Description',
  },
} as Meta

const Template = (args) => <Link {...args} />

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

export const Button = Template.bind({})
Button.args = { button: true }

export const NoUnderline = Template.bind({})
NoUnderline.args = { noUnderline: true }

export const Icon = Template.bind({})
Icon.args = {
  icon: faExclamationCircle,
}

export const IconNoLabel = Template.bind({})
IconNoLabel.args = {
  icon: faExclamationCircle,
  label: null,
}

export const CustomContent = Template.bind({})
CustomContent.args = {
  noUnderline: true,
  children: (
    <>
      <img src="/images/ethereum.png" style={{ width: '1.5em', height: '1.5em' }} />
      <span>Image</span>
    </>
  ),
}

export const Active = Template.bind({})
Active.args = { active: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const ActiveDisabled = Template.bind({})
ActiveDisabled.args = { active: true, disabled: true }
