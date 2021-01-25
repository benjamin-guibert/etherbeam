import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from 'components/Loader'
import { Token } from 'libraries/ethereum/types'
import { fetchTokens } from 'libraries/ethereum/server'
import Page from 'components/Page'
import { printEtherAmount } from 'components/blockchain/helpers'
import Address from 'components/blockchain/Address'
import ClickableTableRow from 'components/ClickableTableRow'
import TokenPriceHistory from 'components/blockchain/TokenPriceHistory'

const FETCH_TOKENS_INTERVAL = 30 * 1000

const LoaderRow = (): ReactElement => {
  return (
    <tr>
      <td>
        <Loader type="dots" />
      </td>
      <td>
        <Loader type="dots" />
      </td>
      <td className="my-d-min-xs">
        <Loader type="dots" />
      </td>
    </tr>
  )
}

const TokensPage = (): ReactElement => {
  const [tokens, setTokens] = useState<Token[]>([])
  const history = useHistory()

  useEffect(() => {
    const startFetchingTokens = async () => {
      fetchTokens().then((fetchedTokens) => {
        if (!fetchedTokens.length) return

        setTokens(fetchedTokens)
      })
    }
    const interval = setInterval(startFetchingTokens, FETCH_TOKENS_INTERVAL)

    startFetchingTokens()

    return () => {
      clearInterval(interval)
    }
  }, [])

  const tokenRows = tokens?.map((token, index) => {
    const { hash, name, price, priceHistory } = token

    return () => (
      <ClickableTableRow key={index} onClick={() => history.push('/tokens/' + hash)}>
        <td>{name}</td>
        <td>
          <span className="my-amount">{price ? printEtherAmount(price) : '--'}</span>
          <TokenPriceHistory priceHistory={priceHistory} className="my-m-0" />
        </td>
        <td className="my-d-min-xs my-text-center">
          <Address address={token} short noFlag />
        </td>
      </ClickableTableRow>
    )
  })

  return (
    <Page title="Tokens">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (Ether)</th>
            <th className="my-d-min-xs">Address</th>
          </tr>
        </thead>
        <tbody>{!!tokens.length ? tokenRows.map((TokenRow, index) => <TokenRow key={index} />) : <LoaderRow />}</tbody>
      </table>
    </Page>
  )
}

export default TokensPage
