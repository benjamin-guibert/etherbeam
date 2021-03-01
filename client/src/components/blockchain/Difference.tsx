import React, { FC } from 'react'
import numeral from 'numeral'
import { HistoryTime } from '../../libraries/types'
import Badge from '../Badge'
import './Difference.scss'

type SizeProp = 's' | 'm' | 'l' | 'xl'

interface DifferenceProps {
  ratio: number
  time: HistoryTime
  size?: SizeProp
}

const Difference: FC<DifferenceProps> = ({ ratio, time, size }: DifferenceProps) => {
  const getColor = () => {
    if (ratio > 1.01) {
      return 'positive'
    } else if (ratio < 0.99) {
      return 'negative'
    } else {
      return 'light'
    }
  }

  return (
    <Badge color={getColor()} size={size}>
      <span className="my-difference-prefix">{time.toUpperCase()}</span>
      <span className="my-difference-amount">{numeral(ratio - 1).format('+0%')}</span>
    </Badge>
  )
}

export default Difference
