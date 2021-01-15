import React, { ReactElement } from 'react'
import './Icon.scss'

interface IconProps {
  src: unknown
  alt?: string
  size?: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | number
  className?: string
  noVerticalAlignment?: boolean
}

const Icon = ({ src, alt = '', size = 'm', className = '', noVerticalAlignment }: IconProps): ReactElement => {
  const getClasses = () => {
    const classes = ['app-icon', `app-icon-${size}`]

    if (noVerticalAlignment) classes.push('app-va-0')
    if (className) classes.push(className)

    return classes.join(' ')
  }

  return <img src={src as string} alt={alt} className={getClasses()} />
}

export default Icon
