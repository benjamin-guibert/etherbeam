import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import './Icon.scss'

type LabelBreakpointProp = 'xs' | 's' | 'm' | 'l'

interface IconProps {
  icon: IconProp
  label?: string
  labelBreakpoint?: LabelBreakpointProp
  className?: string
}

const Icon = ({ icon, label, labelBreakpoint, className }: IconProps): ReactElement => {
  const getLabelClassName = (): string => {
    const labelClassName = ['my-icon-label']
    if (labelBreakpoint) labelClassName.push(`my-d-min-${labelBreakpoint}`)

    return labelClassName.join(' ')
  }

  return (
    <span className={['my-icon', className].join(' ')}>
      <span className="my-icon-svg">
        <FontAwesomeIcon icon={icon} />
      </span>
      {!!label && <span className={getLabelClassName()}>{label}</span>}
    </span>
  )
}

export default Icon
