import React, { FC, ReactNode } from 'react'
import './Link.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface LinkProps {
  href: string
  blank?: boolean
  color?: ColorProp
  description?: string
  noUnderline?: boolean
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

const Link: FC<LinkProps> = ({
  href,
  blank,
  color = 'secondary',
  description,
  noUnderline,
  active,
  disabled,
  className,
  children,
}) => {
  const getClassName = (): string => {
    const classNames = [noUnderline ? 'my-link' : 'my-ulink', `my-clickable my-${color}-fg`, className]
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
      {children}
    </a>
  )
}

export default Link
