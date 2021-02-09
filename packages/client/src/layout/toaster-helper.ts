import { ReactNode } from 'react'

const MAX_TOASTS = 5

type TypeProp = 'info' | 'success' | 'error'

export interface ToastType {
  id?: number
  type: TypeProp
  content: ReactNode
}

interface UseToasterProps {
  addToast: (toask: ToastType) => void
}

export const useToaster = (toasts: ToastType[], setToasts: (toask: ToastType[]) => void): UseToasterProps => {
  const addToast = (toast: ToastType) => {
    toast.id = Date.now()
    const newToasts = [...toasts]
    newToasts.push(toast)

    setToasts(newToasts.slice(-MAX_TOASTS))
  }

  return {
    addToast,
  }
}
