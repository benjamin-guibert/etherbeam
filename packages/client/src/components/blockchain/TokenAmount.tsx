import { Token } from 'libraries/ethereum/types'
import React, { ReactElement } from 'react'
import { AmountPrintOptions, printEtherAmount, printTokenAmount } from './helpers'
import { BigNumber } from 'ethers'
import Badge from '../Badge'

type TokenAmountColorProp = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger'

interface TokenAmountProps {
  amount: BigNumber
  token?: Token
  color?: TokenAmountColorProp
  amountPrintOptions?: AmountPrintOptions
}

const TokenAmount = ({ amount, token, color, amountPrintOptions }: TokenAmountProps): ReactElement => {
  const printedAmount = token
    ? printTokenAmount(amount, token, amountPrintOptions)
    : printEtherAmount(amount, amountPrintOptions)

  return (
    <Badge type={color}>
      <span className="my-symbol">{token ? token.symbol : 'ETH'}</span>
      <span className="my-amount"> {printedAmount}</span>
    </Badge>
  )
}

export default TokenAmount
