import React, { FC } from 'react'
import { TokenPriceHistory as TokenPriceHistoryType } from '../../libraries/ethereum/types'
import List from '../List'
import ListItem from '../ListItem'
import Difference from './Difference'

type SizeProp = 's' | 'm' | 'l' | 'xl'

interface TokenPriceHistoryProps {
  priceHistory: TokenPriceHistoryType[]
  size?: SizeProp
  className?: string
}

const TokenPriceHistory: FC<TokenPriceHistoryProps> = ({ priceHistory, size, className }) => {
  return (
    <List horizontal className={className}>
      {priceHistory.map(({ time, ratio }, index) => (
        <ListItem key={index}>
          <Difference size={size} time={time} ratio={ratio} />
        </ListItem>
      ))}
    </List>
  )
}

export default TokenPriceHistory