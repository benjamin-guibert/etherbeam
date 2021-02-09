import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Token } from '../../libraries/ethereum/types'
import { fetchTokens } from '../../libraries/ethereum/server'
import { ToastType } from '../toaster-helper'
import TokensPage from './TokensPage'

const FETCH_TOKENS_INTERVAL = 30 * 1000

interface TokensPageWrapperProps {
  addToast: (toast: ToastType) => void
}

const TokensPageWrapper: FC<TokensPageWrapperProps> = ({ addToast }) => {
  const addToastRef = useRef<(toast: ToastType) => void>(addToast)
  const [loading, setLoading] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const history = useHistory()

  const goToTokenPage = (hash: string): void => history.push('/tokens/' + hash)

  useEffect(() => {
    addToastRef.current = addToast
  }, [addToast])

  useEffect(() => {
    const startFetchingTokens = async () => {
      setLoading(true)
      fetchTokens()
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
  }, [])

  return <TokensPage tokens={tokens} goToTokenPage={goToTokenPage} loading={loading} />
}

export default TokensPageWrapper
