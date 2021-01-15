import React, { ReactElement, useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from 'components/common/Loader'
import Address from 'components/common/Address'
import { ToastContent } from 'components/Toaster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFileAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faReddit,
  faTwitter,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'
import IconLink from 'components/common/IconLink'
import { printEtherAmount } from 'components/common/helpers'
import Difference from 'components/common/Difference'
import { Token, TransactionActionType } from 'libraries/ethereum/types'
import { fetchToken } from 'libraries/ethereum/server'
import Page from 'components/common/Page'
import TransactionActionsList from './TransactionActionsList'

const FETCH_TOKEN_INTERVAL = 30 * 1000

interface TokenPageParams {
  address: string
}

interface TokenPageProps {
  addToast: (toast: ToastContent) => void
}

const Link = ({ url, title, icon }: { url: string; title: string; icon: IconDefinition }): ReactElement => {
  return (
    <IconLink url={url} title={title}>
      <FontAwesomeIcon icon={icon} size="lg" />
    </IconLink>
  )
}

const TokenPage = ({ addToast }: TokenPageProps): ReactElement => {
  const [token, setToken] = useState<Token>(undefined)
  const [alert, setAlert] = useState<string>(null)
  const addToastRef = useRef(addToast)
  const addressParam = useParams<TokenPageParams>().address
  const {
    name,
    symbol,
    website,
    whitepaper,
    github,
    linkedin,
    facebook,
    reddit,
    twitter,
    telegram,
    discord,
    price,
    priceHistory,
    actions,
  } = token || {}
  const filteredActions = actions?.filter((action) => action.type != TransactionActionType.Approval)

  useEffect(() => {
    addToastRef.current = addToast
  }, [addToast])

  useEffect(() => {
    const getToken = async (): Promise<void> => {
      fetchToken(addressParam, 'actions')
        .then((fetchedToken) => {
          if (!fetchedToken) return setAlert(`The token '${addressParam}' is unknown.`)

          setToken(fetchedToken)
        })
        .catch(() => addToastRef.current({ type: 'error', message: 'Error while fetching token.' }))
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

  return (
    <>
      {!!token && !alert && (
        <Page title={name}>
          <>
            <Row>
              <Col className="my-auto d-none d-lg-inline">
                <Address address={token} size="m" noFlag />
              </Col>
              <Col className="my-auto d-none d-sm-inline d-lg-none">
                <Address address={token} size="m" noFlag short />
              </Col>
              <Col className="ml-auto text-sm-right">
                {website && <Link url={website} title="Website" icon={faHome} />}
                {whitepaper && <Link url={whitepaper} title="White paper" icon={faFileAlt} />}
                {github && <Link url={github} title="Github" icon={faGithub} />}
                {linkedin && <Link url={linkedin} title="LinkedIn" icon={faLinkedin} />}
                {facebook && <Link url={facebook} title="Facebook" icon={faFacebook} />}
                {reddit && <Link url={reddit} title="Reddit" icon={faReddit} />}
                {twitter && <Link url={twitter} title="Twitter" icon={faTwitter} />}
                {telegram && <Link url={telegram} title="Telegram" icon={faTelegram} />}
                {discord && <Link url={discord} title="Discord" icon={faDiscord} />}
              </Col>
            </Row>
            {price && (
              <div className="app-text-lg my-3">
                <Row>
                  <Col className="text-monospace">
                    <span className="d-none d-sm-inline text-muted">{symbol} 1 = </span>
                    {printEtherAmount(price, { withSymbol: true })}
                  </Col>
                </Row>
                {!!priceHistory.length && (
                  <Row>
                    {priceHistory.map(({ time, ratio }, index) => (
                      <Col className="my-auto" key={index}>
                        <Difference time={time} ratio={ratio} />
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            )}
            {!!filteredActions?.length && <TransactionActionsList actions={filteredActions} />}
          </>
        </Page>
      )}
      {!token && !alert && <Loader />}
      {!!alert && <Alert variant="danger">{alert}</Alert>}
    </>
  )
}

export default TokenPage
