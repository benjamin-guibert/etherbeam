import React, { ReactElement } from 'react'
import Toast from './Toast'

export interface ToastContent {
  type: 'error'
  message: string
}

interface ToasterProps {
  toasts: ToastContent[]
}

const Toaster = ({ toasts }: ToasterProps): ReactElement => {
  return (
    <div className="fixed-top m-3">
      {toasts.map(({ type, message }, i) => (
        <Toast key={i} className="ml-auto" type={type}>
          {message}
        </Toast>
      ))}
    </div>
  )
}

export default Toaster
