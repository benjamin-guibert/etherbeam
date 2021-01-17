import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Loader from 'components/common/Loader'
import { ToastContent } from 'components/Toaster'
import Address from 'components/common/Address'
import Difference from 'components/common/Difference'
import { Token } from 'libraries/ethereum/types'
import { fetchTokens } from 'libraries/ethereum/server'
import { printEtherAmount } from 'components/common/helpers'
import { Col, Row } from 'react-bootstrap'
import Page from 'components/common/Page'

const FETCH_TOKENS_INTERVAL = 30 * 1000

interface TokensPageProps {
  addToast: (toast: ToastContent) => void
}

const TokensPage = ({ addToast }: TokensPageProps): ReactElement => {
  const [tokens, setTokens] = useState<Token[]>([])
  const addToastRef = useRef<(toast: ToastContent) => void>(addToast)
  const history = useHistory()

  useEffect(() => {
    addToastRef.current = addToast
  }, [addToast])

  useEffect(() => {
    const startFetchingTokens = async () => {
      fetchTokens()
        .then((fetchedTokens) => {
          if (!fetchedTokens.length) return

          setTokens(fetchedTokens)
        })
        .catch(() => addToastRef.current({ type: 'error', message: 'Error while fetching tokens.' }))
    }
    const interval = setInterval(startFetchingTokens, FETCH_TOKENS_INTERVAL)

    startFetchingTokens()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Page title="Tokens">
      <div>
        {!!tokens.length ? (
          <>
            <Table hover responsive striped variant="dark" bordered size="sm">
              <thead className="text-center">
                <tr>
                  <th className="d-none d-sm-table-cell">Name</th>
                  <th>Price (Ether)</th>
                  <th className="d-none d-md-table-cell">Address</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => {
                  const { hash, name, price, priceHistory } = token

                  return (
                    <tr key={index} className="app-clickable" onClick={() => history.push('/tokens/' + hash)}>
                      <td className="d-none d-sm-table-cell">{name}</td>
                      <td className="text-monospace">
                        <Row>
                          <Col>{price ? printEtherAmount(price) : '--'}</Col>
                        </Row>
                        <Row>
                          {!!priceHistory.length &&
                            priceHistory.map(({ time, ratio }, index) => (
                              <Col xs="auto" key={index} className="pr-0">
                                <Difference time={time} ratio={ratio} />
                              </Col>
                            ))}
                        </Row>
                      </td>
                      <td className="d-none d-md-table-cell text-center">
                        <Address address={token} size="m" short noFlag />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </Page>
  )
}

export default TokensPage
