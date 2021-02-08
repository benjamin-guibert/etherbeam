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

export const IconDark = Template.bind({})
IconDark.args = { iconColor: 'dark' }
export const IconLight = Template.bind({})
IconLight.args = { iconColor: 'light' }
export const IconPrimary = Template.bind({})
IconPrimary.args = { iconColor: 'primary' }
export const IconSecondary = Template.bind({})
IconSecondary.args = { iconColor: 'secondary' }
export const IconPositive = Template.bind({})
IconPositive.args = { iconColor: 'positive' }
export const IconNegative = Template.bind({})
IconNegative.args = { iconColor: 'negative' }

export const IconMedium = Template.bind({})
IconMedium.args = { iconSize: 'm' }
export const IconLarge = Template.bind({})
IconLarge.args = { iconSize: 'l' }
export const IconExtraLarge = Template.bind({})
IconExtraLarge.args = { iconSize: 'xl' }
