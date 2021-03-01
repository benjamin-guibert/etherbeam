import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Token } from '../../libraries/types'
import { fetchTokens } from '../../libraries/server'
import { ToastType } from '../toaster-helper'
import { SessionContext } from '../SessionContext'
import TokensPage from './TokensPage'

const FETCH_TOKENS_INTERVAL = 30 * 1000

interface TokensPageWrapperProps {
  addToast: (toast: ToastType) => void
}

const TokensPageWrapper: FC<TokensPageWrapperProps> = ({ addToast }: TokensPageWrapperProps) => {
  const addToastRef = useRef<(toast: ToastType) => void>(addToast)
  const [loading, setLoading] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const { serverData, currentUser } = useContext(SessionContext)
  const history = useHistory()

  const goToTokenPage = (hash: string): void => history.push('/tokens/' + hash)

  useEffect(() => {
    addToastRef.current = addToast
  }, [addToast])

  useEffect(() => {
    if (!currentUser) return

    const startFetchingTokens = async () => {
      setLoading(true)

      fetchTokens(serverData)
        .then((fetchedTokens) => {
          if (!fetchedTokens.length) return

          setTokens(fetchedTokens)
          setLoading(false)
        })
        .catch(() => addToastRef.current({ type: 'error', content: 'Error while fetching tokens.' }))
    }

    const interval = setInterval(startFetchingTokens, FETCH_TOKENS_INTERVAL)

    startFetchingTokens()

    return () => {
      clearInterval(interval)
    }
  }, [serverData, currentUser])

  return <TokensPage tokens={tokens} goToTokenPage={goToTokenPage} loading={loading} />
}

export default TokensPageWrapper
