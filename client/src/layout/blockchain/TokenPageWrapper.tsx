import React, { FC, useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Token } from '../../libraries/types'
import { fetchToken } from '../../libraries/server'
import { ToastType } from '../toaster-helper'
import { SessionContext } from '../SessionContext'
import TokenPage from './TokenPage'

const FETCH_TOKEN_INTERVAL = 10 * 1000

interface TokenPageParams {
  address: string
}

interface TokenPageWrapperProps {
  addToast: (toast: ToastType) => void
}

const TokenPageWrapper: FC<TokenPageWrapperProps> = ({ addToast }: TokenPageWrapperProps) => {
  const addToastRef = useRef<(toast: ToastType) => void>(addToast)
  const [token, setToken] = useState<Token | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<string | null>(null)
  const addressParam = useParams<TokenPageParams>().address
  const { serverData, currentUser } = useContext(SessionContext)

  useEffect(() => {
    if (!currentUser) return
    const getToken = async (): Promise<void> => {
      setLoading(true)
      fetchToken(serverData, addressParam, 'actions')
        .then((fetchedToken) => {
          if (!fetchedToken) return setAlert(`This token is unknown.`)

          setToken(fetchedToken)
          setLoading(false)
        })
        .catch(() => addToastRef.current({ type: 'error', content: 'Error while fetching token.' }))
    }
    const startFetchingToken = async (): Promise<void> => {
      await getToken()
    }

    const interval = setInterval(getToken, FETCH_TOKEN_INTERVAL)

    startFetchingToken()

    return () => {
      clearInterval(interval)
    }
  }, [serverData, currentUser, addressParam])

  return <TokenPage token={token} alert={alert} loading={loading} />
}

export default TokenPageWrapper
