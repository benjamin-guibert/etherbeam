import React, { ReactElement } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { Address, AddressType } from 'libraries/ethereum/types'
import { getAddressTypeIcon, shortenAddress } from './helpers'
import Icon from 'components/Icon'
import './Address.scss'
import Link from 'components/Link'

interface AddressProps {
  address: Address
  short?: boolean
  noFlag?: boolean
  className?: string
}

const Flag = ({ address }: { address: Address }): ReactElement => {
  const { label, type } = address

  const getTypeIcon = (): IconProp => {
    return getAddressTypeIcon(type) || faTag
  }

  return <Icon icon={getTypeIcon()} label={label} />
}

const Hash = ({ hash, short }: { hash: string; short?: boolean }): ReactElement => {
  return <span className="my-address-hash">{short ? shortenAddress(hash) : hash}</span>
}

const Address = ({ address, noFlag, className, short }: AddressProps): ReactElement => {
  const { hash, type, url } = address

  return (
    <span className={className}>
      <Link href={url} blank>
        {!noFlag && type != AddressType.Unknown ? <Flag address={address} /> : <Hash hash={hash} short={short} />}
      </Link>
    </span>
  )
}

export default Address
