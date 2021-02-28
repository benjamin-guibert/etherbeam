/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
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

const Template = (args: any) => <Badge {...args} />

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

export const Negative = Template.bind({})
;(Negative as any).args = { color: 'negative' }

export const Small = Template.bind({})
;(Small as any).args = { size: 's' }

export const Medium = Template.bind({})
;(Medium as any).args = { size: 'm' }

export const Large = Template.bind({})
;(Large as any).args = { size: 'l' }

export const ExtraLarge = Template.bind({})
;(ExtraLarge as any).args = { size: 'xl' }

export const WithIcon = Template.bind({})
;(WithIcon as any).args = { children: <Icon icon={faExclamationCircle} label="Icon" /> }

export const Clickable = Template.bind({})
;(Clickable as any).decorators = [
  (Story: Story) => (
    <Link href="javascript:" noUnderline>
      <Story />
    </Link>
  ),
]
;(Clickable as any).args = { className: 'my-clickable' }
