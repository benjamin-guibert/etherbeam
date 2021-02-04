import React, { FC } from 'react'
import { shortenAddress } from './helpers'
import './AddressHash.scss'

interface AddressHashProps {
  hash: string
  short?: boolean
}

const Hash: FC<AddressHashProps> = ({ hash, short }) => {
  return <span className="my-addresshash">{short ? shortenAddress(hash) : hash}</span>
}

export default Hash
