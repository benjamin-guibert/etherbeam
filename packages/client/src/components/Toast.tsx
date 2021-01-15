import React, { ReactElement, ReactNode, useState } from 'react'
import BsToast from 'react-bootstrap/Toast'
import './Toast.scss'

interface ToastProps {
  type: 'error'
  className?: string
  children: ReactNode
}

const Toast = ({ type, className = '', children }: ToastProps): ReactElement => {
  const getDataFromType = (): { variant: string; title: string } => {
    switch (type) {
      case 'error':
        return {
          title: 'Error',
          variant: 'bg-danger',
        }
      default:
        return {
          title: '',
          variant: '',
        }
    }
  }

  const [show, setShow] = useState<boolean>(true)

  const { variant, title } = getDataFromType()

  return (
    <BsToast className={[className, variant].join(' ')} onClose={() => setShow(false)} show={show} autohide>
      <BsToast.Header>
        <strong className="mr-auto">{title}</strong>
      </BsToast.Header>
      <BsToast.Body>{children}</BsToast.Body>
    </BsToast>
  )
}

export default Toast
