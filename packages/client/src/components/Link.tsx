import React, { ReactElement, ReactNode } from 'react'
import './Link.scss'

interface LinkProps {
  title?: string
  href?: string
  onClick?: (event: React.SyntheticEvent) => void
  blank?: boolean
  active?: boolean
  disabled?: boolean
  children?: ReactNode
}

const Link = ({ title, href, onClick, blank, active, disabled, children }: LinkProps): ReactElement => {
  const onClickAction = (event: React.SyntheticEvent): void => {
    if (disabled) return

    event.stopPropagation()
    onClick?.(event)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>): void => {
    if (event.key == 'Enter') onClickAction(event)
  }

  const getClassName = (): string => {
    const classNames = ['my-link']
    if (disabled) classNames.push('my-disabled')
    if (active) classNames.push('my-active')

    return classNames.join(' ')
  }

  return (
    <a
      title={title}
      className={getClassName()}
      target={blank ? '_blank' : null}
      href={href && !disabled ? href : null}
      onClick={onClickAction}
      onKeyUp={onKeyUp}
      tabIndex={!disabled ? 0 : null}
    >
      {children}
    </a>
  )
}

export default Link
