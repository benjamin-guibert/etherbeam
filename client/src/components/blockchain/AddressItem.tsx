import React, { FC } from 'react'
import { Address, AddressType } from '../../libraries/types'
import Link from '../Link'
import AddressFlag from './AddressFlag'
import AddressHash from './AddressHash'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'

interface AddressItemProps {
  address: Address
  color?: ColorProp
  short?: boolean
  noFlag?: boolean
  className?: string
}

const AddressItem: FC<AddressItemProps> = ({ address, color, noFlag, className, short }) => {
  const { hash, type, url } = address

  return (
    <span className={className}>
      <Link href={url} external noUnderline color={color}>
        {!noFlag && type != AddressType.Unknown ? (
          <AddressFlag address={address} color={color} className="my-clickable" />
        ) : (
          <AddressHash hash={hash} short={short} />
        )}
      </Link>
    </span>
  )
}

export default AddressItem
