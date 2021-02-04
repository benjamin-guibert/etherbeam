import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Token } from '../../libraries/ethereum/types'
import { fetchTokens } from '../../libraries/ethereum/server'
import TokensPage from './TokensPage'

const FETCH_TOKENS_INTERVAL = 30 * 1000

const TokensPageWrapper: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const history = useHistory()

  const goToTokenPage = (hash: string): void => history.push('/tokens/' + hash)

  useEffect(() => {
    const startFetchingTokens = async () => {
      setLoading(true)
      fetchTokens()
        .then((fetchedTokens) => {
          if (!fetchedTokens.length) return

          setTokens(fetchedTokens)
        })
        .finally(() => setLoading(false))
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
