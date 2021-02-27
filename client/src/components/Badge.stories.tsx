import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
import Link from './Link'
import Badge from './Badge'

export default {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
} as Meta

const Template = (args) => <Badge {...args} />

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

export const Negative = Template.bind({})
Negative.args = { color: 'negative' }

export const Small = Template.bind({})
Small.args = { size: 's' }

export const Medium = Template.bind({})
Medium.args = { size: 'm' }

export const Large = Template.bind({})
Large.args = { size: 'l' }

export const ExtraLarge = Template.bind({})
ExtraLarge.args = { size: 'xl' }

export const WithIcon = Template.bind({})
WithIcon.args = { children: <Icon icon={faExclamationCircle} label="Icon" /> }

export const Clickable = Template.bind({})
Clickable.decorators = [
  (Story) => (
    <Link href="javascript:" noUnderline>
      <Story />
    </Link>
  ),
]
Clickable.args = { className: 'my-clickable' }
