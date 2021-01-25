import React, { ReactElement } from 'react'
import { TokenPriceHistory } from 'libraries/ethereum/types'
import Difference from './Difference'
import './TokenPriceHistory.scss'

interface TokenPriceHistoryProps {
  priceHistory: TokenPriceHistory[]
  className?: string
}

const TokenPriceHistory = ({ priceHistory, className }: TokenPriceHistoryProps): ReactElement => {
  return (
    <ul className={['my-tokenpricehistory my-hlist', className].join(' ')}>
      {priceHistory.map(({ time, ratio }, index) => (
        <li key={index}>
          <Difference time={time} ratio={ratio} />
        </li>
      ))}
    </ul>
  )
}

export default TokenPriceHistory
