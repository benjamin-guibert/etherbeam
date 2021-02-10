import React, { FC } from 'react'
import { faHome, faFileAlt, IconDefinition, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faReddit,
  faTwitter,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'
import { Token, TransactionActionType } from '../../libraries/ethereum/types'
import { getUniswapTradeUrl } from '../../components/blockchain/helpers'
import Alert from '../../components/Alert'
import Block from '../../components/Block'
import Link from '../../components/Link'
import Loader from '../../components/Loader'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import AddressItem from '../../components/blockchain/AddressItem'
import TokenAmount from '../../components/blockchain/TokenAmount'
import TokenPriceHistory from '../../components/blockchain/TokenPriceHistory'
import TokenChart from '../../components/blockchain/TokenChart'
import TransactionActionList from '../../components/blockchain/TransactionActionList'
import './TokenPage.scss'

interface IconLinkProps {
  url: string
  icon: IconDefinition
  description: string
}

const IconLink: FC<IconLinkProps> = ({ url, icon, description }) => {
  return (
    <ListItem className="my-tokenpage-link">
      <Link href={url} icon={icon} description={description} blank size="l" />
    </ListItem>
  )
}

interface TokenPageProps {
  token: Token
  alert?: string
  loading?: boolean
}

const TokenPage: FC<TokenPageProps> = ({ token, alert, loading }) => {
  const {
    hash,
    name,
    symbol,
    chartPair,
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

  const Links: FC = () => {
    return (
      <List horizontal>
        {website && <IconLink url={website} description="Website" icon={faHome} />}
        {whitepaper && <IconLink url={whitepaper} description="Whitepaper" icon={faFileAlt} />}
        {github && <IconLink url={github} description="Github" icon={faGithub} />}
        {linkedin && <IconLink url={linkedin} description="LinkedIn" icon={faLinkedin} />}
        {facebook && <IconLink url={facebook} description="Facebook" icon={faFacebook} />}
        {reddit && <IconLink url={reddit} description="Reddit" icon={faReddit} />}
        {twitter && <IconLink url={twitter} description="Twitter" icon={faTwitter} />}
        {telegram && <IconLink url={telegram} description="Telegram" icon={faTelegram} />}
        {discord && <IconLink url={discord} description="Discord" icon={faDiscord} />}
      </List>
    )
  }

  const TradeActions: FC = () => {
    return (
      <Block>
        <List horizontal center>
          <ListItem>
            <Link
              href={getUniswapTradeUrl(null, hash)}
              icon={faPlusCircle}
              label="Buy"
              color="primary"
              size="l"
              button
              blank
            />
          </ListItem>
          <ListItem>
            <Link
              href={getUniswapTradeUrl(hash, null)}
              icon={faMinusCircle}
              label="Sell"
              color="primary"
              size="l"
              button
              blank
            />
          </ListItem>
        </List>
      </Block>
    )
  }

  return (
    <>
      <div>
        <Block className="my-tokenpage-main">
          <div className="my-tokenpage-details">
            <div>
              {token && <h1>{name}</h1>}
              {!token && !loading && !!alert && <h1>Unknown token</h1>}
              {token && (
                <>
                  <Links />
                  <AddressItem className="my-d-min-m" address={token} noFlag />
                  <AddressItem className="my-d-max-m" address={token} noFlag short />
                  <Block>
                    <span className="my-d-min-xs my-disabled-fg my-size-l">{symbol} 1 = </span>
                    <TokenAmount amount={price} size="l" />
                  </Block>
                  <Block>{!!priceHistory?.length && <TokenPriceHistory priceHistory={priceHistory} size="m" />}</Block>
                </>
              )}
            </div>
            {token && <TradeActions />}
          </div>
          <div className="my-tokenpage-chart my-d-min-s">
            <TokenChart pair={chartPair} height={300} />
          </div>
        </Block>

        {!!filteredActions?.length && (
          <section>
            <h3>Actions</h3>
            <TransactionActionList actions={filteredActions} />
          </section>
        )}
      </div>
      {!token && loading && <Loader type="dots" />}
      {!token && !!alert && <Alert color="negative">{alert}</Alert>}
    </>
  )
}

export default TokenPage
