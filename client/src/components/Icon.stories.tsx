/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Template = (args: any) => <Icon {...args} />

export const Default = Template.bind({})

export const NoLabel = Template.bind({})
;(NoLabel as any).args = { label: null }

export const LabelBreakpoint = Template.bind({})
;(LabelBreakpoint as any).args = { labelBreakpoint: 'xs' }

export const Medium = Template.bind({})
;(Medium as any).args = { size: 'm' }
export const Large = Template.bind({})
;(Large as any).args = { size: 'l' }
export const ExtraLarge = Template.bind({})
;(ExtraLarge as any).args = { size: 'xl' }

export const IconMedium = Template.bind({})
;(IconMedium as any).args = { iconSize: 'm' }
export const IconLarge = Template.bind({})
;(IconLarge as any).args = { iconSize: 'l' }
export const IconExtraLarge = Template.bind({})
;(IconExtraLarge as any).args = { iconSize: 'xl' }

export const IconAlt = Template.bind({})
;(IconAlt as any).args = { className: 'my-dark-bg', iconAlt: true }
