import React, { ReactElement } from 'react'
import Link from 'components/Link'
import './EtherscanLink.scss'

interface EtherscanLinkProps {
  url: string
}

const EtherscanLink = ({ url }: EtherscanLinkProps): ReactElement => {
  return (
    <Link href={url} title="Etherscan" blank>
      <div className="my-etherscanlink-img">
        <img src="/images/etherscan.svg" />
      </div>
    </Link>
  )
}

export default EtherscanLink
