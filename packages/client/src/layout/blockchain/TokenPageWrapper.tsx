import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Address from 'components/blockchain/AddressItem'
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
import { Token, TransactionActionType } from 'libraries/ethereum/types'
import { fetchToken } from 'libraries/ethereum/server'
import Alert from 'components/Alert'
import './TokenPage.scss'
import TokenAmount from 'components/blockchain/TokenAmount'
import TokenPriceHistory from 'components/blockchain/TokenPriceHistory'
import TokenChart from 'components/blockchain/TokenChart'
import TransactionActionList from 'components/blockchain/TransactionActionList'
import Link from 'components/Link'
import Icon from 'components/Icon'
import Button from 'components/Button'

const FETCH_TOKEN_INTERVAL = 30 * 1000

interface TokenPageParams {
  address: string
}

interface IconLinkProps {
  url: string
  title: string
  icon: IconDefinition
}

const IconLink: FC<IconLinkProps> = ({ url, title, icon }) => {
  return (
    <li>
      <Link href={url} title={title} blank>
        <Icon icon={icon} />
      </Link>
    </li>
  )
}

const TokenPage: FC = () => {
  const [token, setToken] = useState<Token>(undefined)
  const [alert, setAlert] = useState<string>(null)
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
    const getToken = async (): Promise<void> => {
      fetchToken(addressParam, 'actions').then((fetchedToken) => {
        if (!fetchedToken) return setAlert(`The token '${addressParam}' is unknown.`)

        setToken(fetchedToken)
      })
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
    <Page title={name || 'Unknown token'} titleLoading={!name && !alert}>
      {!!alert && <Alert type="danger">{alert}</Alert>}
      {token && (
        <>
          <h2 className="my-page-subheader my-tokenpage-subheader">
            <nav>
              <ul className="my-tokenpage-links my-hlist">
                {website && <IconLink url={website} title="Website" icon={faHome} />}
                {whitepaper && <IconLink url={whitepaper} title="Whitepaper" icon={faFileAlt} />}
                {github && <IconLink url={github} title="Github" icon={faGithub} />}
                {linkedin && <IconLink url={linkedin} title="LinkedIn" icon={faLinkedin} />}
                {facebook && <IconLink url={facebook} title="Facebook" icon={faFacebook} />}
                {reddit && <IconLink url={reddit} title="Reddit" icon={faReddit} />}
                {twitter && <IconLink url={twitter} title="Twitter" icon={faTwitter} />}
                {telegram && <IconLink url={telegram} title="Telegram" icon={faTelegram} />}
                {discord && <IconLink url={discord} title="Discord" icon={faDiscord} />}
              </ul>
            </nav>
            <div>
              <Address className="my-d-min-m" address={token} noFlag />
              <Address className="my-d-max-m" address={token} noFlag short />
            </div>
          </h2>
          {price && (
            <section className="my-tokenpage-price">
              <span className="my-tokenpage-price-symbol my-d-min-xs">
                <span className="my-symbol">{symbol}</span>
                <span className="my-amount"> 1 = </span>
              </span>
              <TokenAmount amount={price} type="primary" />
              <TokenPriceHistory priceHistory={priceHistory} className="my-tokenpage-history" />
            </section>
          )}
          <section className="my-tokenpage-actions my-hlist">
            <Button>Buy</Button>
            <Button>Sell</Button>
          </section>
          <section>
            <TokenChart symbol={symbol} height={300} />
          </section>
          <section>
            <TransactionActionList actions={filteredActions} />
          </section>
        </>
      )}
    </Page>
  )
}

export default TokenPage
