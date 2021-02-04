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

export const LabelBreakpointExtraSmall = Template.bind({})
LabelBreakpointExtraSmall.args = { labelBreakpoint: 'xs' }

export const LabelBreakpointSmall = Template.bind({})
LabelBreakpointSmall.args = { labelBreakpoint: 's' }

export const LabelBreakpointMedium = Template.bind({})
LabelBreakpointMedium.args = { labelBreakpoint: 'm' }

export const LabelBreakpointLarge = Template.bind({})
LabelBreakpointLarge.args = { labelBreakpoint: 'l' }

export const Medium = Template.bind({})
Medium.args = { size: 'm' }
export const Large = Template.bind({})
Large.args = { size: 'l' }
export const ExtraLarge = Template.bind({})
ExtraLarge.args = { size: 'xl' }
