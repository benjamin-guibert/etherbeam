import React, { ReactElement } from 'react'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faWallet, faFile, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Address, AddressType } from 'libraries/ethereum/types'
import { shortenAddress } from './helpers'

interface AddressProps {
  address: Address
  size?: 'xs' | 'sm' | 'm' | 'lg' | 'xl' | number
  short?: boolean
  className?: string
  noFlag?: boolean
}

const Flag = ({ address }: { address: Address }): ReactElement => {
  const { label, type } = address

  const useType = () => {
    switch (type) {
      case AddressType.Wallet:
        return {
          variant: 'success',
          icon: faWallet,
        }
      case AddressType.Contract:
        return {
          variant: 'primary',
          icon: faFile,
        }
      case AddressType.Token:
        return {
          variant: 'warning',
          icon: faDotCircle,
        }
      default:
        return {
          variant: 'secondary',
          icon: faTag,
        }
    }
  }

  const { variant, icon } = useType()

  return (
    <Badge variant={variant}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {label}
    </Badge>
  )
}

const Hash = ({ hash, short }: { hash: string; short?: boolean }): ReactElement => {
  const label = short ? shortenAddress(hash) : hash
  return <span className="text-monospace">{label}</span>
}

const Address = ({ address, size = 'xs', short, noFlag, className }: AddressProps): ReactElement => {
  const { hash, url, label } = address

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`address-${hash}`}>{hash}</Tooltip>}>
      <Button
        className={[`p-0 app-text-${size}`, className].join(' ')}
        variant="link"
        href={url}
        target="_blank"
        onClick={(event) => event.stopPropagation()}
      >
        {!noFlag && !!label ? <Flag address={address} /> : <Hash hash={hash} short={short} />}
      </Button>
    </OverlayTrigger>
  )
}

export default Address
