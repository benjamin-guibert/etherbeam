import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import Icon from './Icon'
import './Toast.scss'

const AUTO_HIDE_DELAY = 5 * 1000

type TypeProp = 'info' | 'success' | 'error'

interface ToastProps {
  type?: TypeProp
  children?: ReactNode
}

const Toast: FC<ToastProps> = ({ type = 'info', children }) => {
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => setHidden(true), AUTO_HIDE_DELAY)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const getPropsFromType = (): { color: string; icon: IconProp | null } => {
    switch (type) {
      case 'success':
        return { color: 'positive', icon: faCheckCircle }
      case 'error':
        return { color: 'negative', icon: faTimesCircle }
      case 'info':
        return { color: 'dark', icon: faInfoCircle }
      default:
        return { color: 'light', icon: null }
    }
  }

  const { color, icon } = getPropsFromType()

  return (
    <div className={[`my-toast my-${color}-bg`, hidden ? 'my-toast-hidden' : ''].join(' ')}>
      <div className="my-toast-content">{children}</div>
      {icon && <Icon icon={icon} size="xl" className="my-toast-icon" iconAlt />}
    </div>
  )
}

export default Toast
