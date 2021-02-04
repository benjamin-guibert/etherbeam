import React, { FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Icon.scss'

type LabelBreakpointProp = 'xs' | 's' | 'm' | 'l'
type SizeProp = 'm' | 'l' | 'xl'

interface IconProps {
  icon: IconProp
  label?: string
  labelBreakpoint?: LabelBreakpointProp
  size?: SizeProp
  className?: string
}

const Icon: FC<IconProps> = ({ icon, label, labelBreakpoint, size, className }) => {
  const classNames = ['my-icon', size ? `my-size-${size}` : '', className].join(' ')
  const labelClassName = ['my-icon-label', labelBreakpoint ? `my-d-min-${labelBreakpoint}` : ''].join(' ')

  return (
    <span className={classNames}>
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      {!!label && <span className={labelClassName}>{label}</span>}
    </span>
  )
}

export default Icon
