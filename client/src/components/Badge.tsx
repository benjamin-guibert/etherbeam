import React, { FC, ReactNode } from 'react'
import './Badge.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'
type SizeProp = 's' | 'm' | 'l' | 'xl'

interface BadgeProps {
  color?: ColorProp
  size?: SizeProp
  className?: string
  children?: ReactNode
}

const Badge: FC<BadgeProps> = ({ color = 'light', size, className, children }: BadgeProps) => {
  const spanClassName = [`my-badge my-${color}-bg`, size ? `my-size-${size}` : '', className].join(' ')

  return <span className={spanClassName}>{children}</span>
}

export default Badge
