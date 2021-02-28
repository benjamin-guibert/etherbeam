/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Template = (args: any) => <Link {...args} />

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

export const Button = Template.bind({})
;(Button as any).args = { button: true }

export const NoUnderline = Template.bind({})
;(NoUnderline as any).args = { noUnderline: true }

export const Icon = Template.bind({})
;(Icon as any).args = {
  icon: faExclamationCircle,
}

export const IconNoLabel = Template.bind({})
;(IconNoLabel as any).args = {
  icon: faExclamationCircle,
  label: null,
}

export const CustomContent = Template.bind({})
;(CustomContent as any).args = {
  noUnderline: true,
  children: (
    <>
      <img src="/images/ethereum.png" style={{ width: '1.5em', height: '1.5em' }} />
      <span>Image</span>
    </>
  ),
}

export const Active = Template.bind({})
;(Active as any).args = { active: true }

export const Disabled = Template.bind({})
;(Disabled as any).args = { disabled: true }

export const ActiveDisabled = Template.bind({})
;(ActiveDisabled as any).args = { active: true, disabled: true }
