import React, { ReactElement } from 'react'
import numeral from 'numeral'
import { HistoryTime } from 'libraries/ethereum/types'
import Badge from '../Badge'
import './Difference.scss'

interface DifferenceProps {
  ratio: number
  time?: HistoryTime
}

const Difference = ({ ratio, time }: DifferenceProps): ReactElement => {
  const getColor = () => {
    if (ratio > 1.01) {
      return 'success'
    } else if (ratio < 0.99) {
      return 'danger'
    } else {
      return 'neutral'
    }
  }

  return (
    <Badge type={getColor()}>
      <span className="my-difference-prefix">{time.toUpperCase()}</span>
      <span className="my-amount">{numeral(ratio - 1).format('+0%')}</span>
    </Badge>
  )
}

export default Difference
