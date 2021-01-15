import React, { ReactElement } from 'react'
import numeral from 'numeral'
import { Badge } from 'react-bootstrap'
import { HistoryTime } from 'libraries/ethereum/types'

interface DifferenceProps {
  ratio: number
  time?: HistoryTime
}

const Difference = ({ ratio, time }: DifferenceProps): ReactElement => {
  const getVariant = () => {
    if (ratio > 1.01) {
      return 'success'
    } else if (ratio < 0.99) {
      return 'danger'
    } else {
      return 'secondary'
    }
  }

  return (
    <Badge variant={getVariant()} className="text-monospace">
      {time && <span className="mr-2">{time.toUpperCase()}</span>}
      {numeral(ratio - 1).format('+0 %')}
    </Badge>
  )
}

export default Difference
