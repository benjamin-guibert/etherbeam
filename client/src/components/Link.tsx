import React, { FC, ReactNode } from 'react'
import { useHistory } from 'react-router'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from './Icon'
import './Link.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'
type SizeProp = 'm' | 'l' | 'xl'
type LabelBreakpointProp = 'xs' | 's' | 'm' | 'l'

interface LinkProps {
  href: string
  external?: boolean
  label?: string
  icon?: IconProp
  description?: string
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
  external,
  label,
  icon,
  description,
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
  const history = useHistory()

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

  const onKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>): void => {
    if (event.key == 'Enter') runAction()
  }

  const runAction = (): void => {
    if (!disabled) history.push(href, {})
  }

  return (
    <a
      title={description}
      className={getClassName()}
      target={external ? '_blank' : undefined}
      href={external && !disabled ? href : undefined}
      onClick={!external ? runAction : undefined}
      onKeyUp={!external ? onKeyUp : undefined}
      tabIndex={!disabled ? 0 : undefined}
    >
      {children ? (
        children
      ) : icon ? (
        <Icon icon={icon} labelBreakpoint={labelBreakpoint} label={label} iconAlt={button} />
      ) : (
        <span>{label}</span>
      )}
    </a>
  )
}

export default Link
