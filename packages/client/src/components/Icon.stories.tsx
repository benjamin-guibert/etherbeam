import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'

export default {
  title: 'Components/Icon',
  component: Icon,
  args: {
    icon: faExclamationCircle,
    label: 'Label',
  },
} as Meta

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})

export const NoLabel = Template.bind({})
NoLabel.args = { label: null }

export const LabelBreakpoint = Template.bind({})
LabelBreakpoint.args = { labelBreakpoint: 'xs' }

export const Medium = Template.bind({})
Medium.args = { size: 'm' }
export const Large = Template.bind({})
Large.args = { size: 'l' }
export const ExtraLarge = Template.bind({})
ExtraLarge.args = { size: 'xl' }

export const IconMedium = Template.bind({})
IconMedium.args = { iconSize: 'm' }
export const IconLarge = Template.bind({})
IconLarge.args = { iconSize: 'l' }
export const IconExtraLarge = Template.bind({})
IconExtraLarge.args = { iconSize: 'xl' }

export const IconAlt = Template.bind({})
IconAlt.args = { className: 'my-dark-bg', iconAlt: true }
