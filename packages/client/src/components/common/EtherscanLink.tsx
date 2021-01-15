import React, { ReactElement } from 'react'
import Button from 'react-bootstrap/Button'
import Icon from './Icon'
import EtherscanIcon from 'images/etherscan.svg'
import EtherscanWhiteIcon from 'images/etherscan-white.svg'

interface EtherscanLinkProps {
  url: string
  white?: boolean
  size?: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | number
  className?: string
  noVerticalAlignment?: boolean
}

const EtherscanLink = ({
  url,
  white,
  size = 'lg',
  className,
  noVerticalAlignment,
}: EtherscanLinkProps): ReactElement => {
  return (
    <Button
      className={['shadow-none', className].join(' ')}
      variant="link"
      title="Link to Etherscan"
      href={url}
      onClick={(event) => event.stopPropagation()}
      target="_blank"
    >
      <Icon
        src={white ? EtherscanWhiteIcon : EtherscanIcon}
        size={size}
        alt="Link to Etherscan"
        noVerticalAlignment={noVerticalAlignment}
      />
    </Button>
  )
}

export default EtherscanLink
