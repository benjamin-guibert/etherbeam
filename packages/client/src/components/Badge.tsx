import React, { ReactElement, ReactNode } from 'react'
import './Badge.scss'

type BadgeTypeProp = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger'

interface BadgeProps {
  type?: BadgeTypeProp
  className?: string
  children?: ReactNode
}

const Badge = ({ type = 'neutral', className, children }: BadgeProps): ReactElement => {
  return <span className={[`my-badge my-color-${type}`, className].join(' ')}>{children}</span>
}

export default Badge
