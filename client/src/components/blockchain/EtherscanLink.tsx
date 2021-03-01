import React, { FC } from 'react'
import Link from '../Link'
import './EtherscanLink.scss'

type SizeProp = 'm' | 'l' | 'xl'

interface EtherscanLinkProps {
  url: string
  size?: SizeProp
}

const EtherscanLink: FC<EtherscanLinkProps> = ({ url, size }: EtherscanLinkProps) => {
  return (
    <Link href={url} description="Etherscan" external className={size ? `my-size-${size}` : ''}>
      <div className="my-etherscanlink-img">
        <img src="/images/etherscan.svg" />
      </div>
    </Link>
  )
}

export default EtherscanLink
