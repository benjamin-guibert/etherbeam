import React, { ReactElement, ReactNode } from 'react'
import './Alert.scss'

type AlertTypeProp = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger'

interface AlertProps {
  type?: AlertTypeProp
  children?: ReactNode
}

const Alert = ({ type = 'neutral', children }: AlertProps): ReactElement => {
  return <div className={`my-alert my-color-${type}`}>{children}</div>
}

export default Alert
