import React, { FC, ReactNode } from 'react'
import './Alert.scss'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface AlertProps {
  color?: ColorProp
  children?: ReactNode
}

const Alert: FC<AlertProps> = ({ color = 'light', children }: AlertProps) => {
  return <div className={`my-alert my-${color}-bg`}>{children}</div>
}

export default Alert
