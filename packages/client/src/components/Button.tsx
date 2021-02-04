import React, { FC, ReactNode } from 'react'
import './Button.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface ButtonProps {
  description?: string
  action?: () => void
  color?: ColorProp
  link?: boolean
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
  action,
  description,
  color = 'light',
  link,
  active,
  disabled,
  className,
  children,
}) => {
  const getClassName = (): string => {
    const classNames = [
      link ? 'my-button-link' : 'my-button',
      link ? `my-${color}-fg` : `my-${color}-bg`,
      'my-clickable',
    ]
    if (disabled) {
      if (!link) classNames.push('my-disabled-bg')
      classNames.push('my-disabled-fg')
    }
    if (active) classNames.push('my-active')
    if (className) classNames.push(className)

    return classNames.join(' ')
  }

  return (
    <button className={getClassName()} title={description} onClick={action} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
