import React, { FC, ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from './Icon'
import './Link.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'
type SizeProp = 'm' | 'l' | 'xl'
type LabelBreakpointProp = 'xs' | 's' | 'm' | 'l'

interface LinkProps {
  href: string
  label?: string
  icon?: IconProp
  description?: string
  blank?: boolean
  color?: ColorProp
  size?: SizeProp
  button?: boolean
  noUnderline?: boolean
  labelBreakpoint?: LabelBreakpointProp
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

const Link: FC<LinkProps> = ({
  href,
  label,
  icon,
  description,
  blank,
  color = 'secondary',
  size,
  button,
  noUnderline,
  labelBreakpoint,
  active,
  disabled,
  className,
  children,
}) => {
  const getClassName = (): string => {
    const classNames = ['my-clickable', className]
    if (button) {
      classNames.push(`my-link-button my-${color}-bg`)
    } else {
      classNames.push(noUnderline ? 'my-link' : 'my-ulink')
      classNames.push(`my-${color}-fg`)
    }
    if (size) classNames.push(`my-size-${size}`)
    if (disabled) classNames.push('my-disabled-fg')
    if (active) classNames.push('my-active')

    return classNames.join(' ')
  }

  return (
    <a
      title={description}
      className={getClassName()}
      target={blank ? '_blank' : null}
      href={!disabled ? href : null}
      tabIndex={!disabled ? 0 : null}
    >
      {children ? (
        children
      ) : icon ? (
        <Icon
          icon={icon}
          iconColor={color as 'dark' | 'positive' | 'negative'}
          labelBreakpoint={labelBreakpoint}
          label={label}
        />
      ) : (
        <span>{label}</span>
      )}
    </a>
  )
}

export default Link
