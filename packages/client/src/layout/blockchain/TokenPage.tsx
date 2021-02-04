import React, { FC } from 'react'
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
import { Token, TransactionActionType } from '../../libraries/ethereum/types'
import Alert from '../../components/Alert'
import Link from '../../components/Link'
import Icon from '../../components/Icon'
import Loader from '../../components/Loader'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import AddressItem from '../../components/blockchain/AddressItem'
import TokenAmount from '../../components/blockchain/TokenAmount'
import TokenPriceHistory from '../../components/blockchain/TokenPriceHistory'
import TokenChart from '../../components/blockchain/TokenChart'
import './TokenPage.scss'

interface IconLinkProps {
  url: string
  title: string
  icon: IconDefinition
}

const IconLink: FC<IconLinkProps> = ({ url, title, icon }) => {
  return (
    <ListItem>
      <Link href={url} description={title} blank noUnderline>
        <Icon icon={icon} />
      </Link>
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

  return (
    <>
      <h1>
        {token && name}
        {!token && loading && <Loader type="dots" />}
        {!token && !loading && 'Unknown token'}
      </h1>

      {token && (
        <>
          <h2 className="my-tokenpage-subheader">
            <List horizontal className="my-tokenpage-links">
              {website && <IconLink url={website} title="Website" icon={faHome} />}
              {whitepaper && <IconLink url={whitepaper} title="Whitepaper" icon={faFileAlt} />}
              {github && <IconLink url={github} title="Github" icon={faGithub} />}
              {linkedin && <IconLink url={linkedin} title="LinkedIn" icon={faLinkedin} />}
              {facebook && <IconLink url={facebook} title="Facebook" icon={faFacebook} />}
              {reddit && <IconLink url={reddit} title="Reddit" icon={faReddit} />}
              {twitter && <IconLink url={twitter} title="Twitter" icon={faTwitter} />}
              {telegram && <IconLink url={telegram} title="Telegram" icon={faTelegram} />}
              {discord && <IconLink url={discord} title="Discord" icon={faDiscord} />}
            </List>
            <>
              <AddressItem className="my-d-min-m" address={token} noFlag />
              <AddressItem className="my-d-max-m" address={token} noFlag short />
            </>
          </h2>
          <section>
            <span className="my-d-min-xs my-disabled-fg my-size-l">
              <span className="my-symbol">{symbol}</span>
              <span className="my-amount"> 1 = </span>
            </span>
            <TokenAmount amount={price} size="l" />
            {!!priceHistory?.length && (
              <TokenPriceHistory priceHistory={priceHistory} size="m" className="my-tokenpage-history" />
            )}
          </section>
          <section>
            <TokenChart symbol={symbol} height={300} />
          </section>
        </>
      )}
      {!token && !!alert && <Alert color="negative">{alert}</Alert>}
    </>
    // <Page title={name || 'Unknown token'} titleLoading={!name && !alert}>
    //   {!!alert && <Alert type="danger">{alert}</Alert>}
    //   {token && (
    //     <>
    //       <h2 className="my-page-subheader my-tokenpage-subheader">
    //         <nav>
    //           <ul className="my-tokenpage-links my-hlist">
    //             {website && <IconLink url={website} title="Website" icon={faHome} />}
    //             {whitepaper && <IconLink url={whitepaper} title="Whitepaper" icon={faFileAlt} />}
    //             {github && <IconLink url={github} title="Github" icon={faGithub} />}
    //             {linkedin && <IconLink url={linkedin} title="LinkedIn" icon={faLinkedin} />}
    //             {facebook && <IconLink url={facebook} title="Facebook" icon={faFacebook} />}
    //             {reddit && <IconLink url={reddit} title="Reddit" icon={faReddit} />}
    //             {twitter && <IconLink url={twitter} title="Twitter" icon={faTwitter} />}
    //             {telegram && <IconLink url={telegram} title="Telegram" icon={faTelegram} />}
    //             {discord && <IconLink url={discord} title="Discord" icon={faDiscord} />}
    //           </ul>
    //         </nav>
    //         <div>
    //           <Address className="my-d-min-m" address={token} noFlag />
    //           <Address className="my-d-max-m" address={token} noFlag short />
    //         </div>
    //       </h2>
    //       {price && (
    //         <section className="my-tokenpage-price">
    //           <span className="my-tokenpage-price-symbol my-d-min-xs">
    //             <span className="my-symbol">{symbol}</span>
    //             <span className="my-amount"> 1 = </span>
    //           </span>
    //           <TokenAmount amount={price} type="primary" />
    //           <TokenPriceHistory priceHistory={priceHistory} className="my-tokenpage-history" />
    //         </section>
    //       )}
    //       <section className="my-tokenpage-actions my-hlist">
    //         <Button>Buy</Button>
    //         <Button>Sell</Button>
    //       </section>
    //       <section>
    //         <TokenChart symbol={symbol} height={300} />
    //       </section>
    //       <section>
    //         <TransactionActionList actions={filteredActions} />
    //       </section>
    //     </>
    //   )}
    // </Page>
  )
}

export default TokenPage
