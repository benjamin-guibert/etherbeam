import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Token } from '../../libraries/ethereum/types'
import { fetchToken } from '../../libraries/ethereum/server'
import TokenPage from './TokenPage'

const FETCH_TOKEN_INTERVAL = 30 * 1000

interface TokenPageParams {
  address: string
}

const TokenPageWrapper: FC = () => {
  const [token, setToken] = useState<Token>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>(null)
  const addressParam = useParams<TokenPageParams>().address

  useEffect(() => {
    const getToken = async (): Promise<void> => {
      fetchToken(addressParam, 'actions')
        .then((fetchedToken) => {
          setLoading(true)
          if (!fetchedToken) return setAlert(`This token is unknown.`)

          setToken(fetchedToken)
        })
        .finally(() => setLoading(false))
    }
    const startFetchingToken = async (): Promise<void> => {
      await getToken()
    }

    const interval = setInterval(getToken, FETCH_TOKEN_INTERVAL)

    startFetchingToken()

    return () => {
      clearInterval(interval)
    }
  }, [addressParam])

  return <TokenPage token={token} alert={alert} loading={loading} />
}

export default TokenPageWrapper
