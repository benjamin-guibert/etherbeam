import { Token } from 'libraries/types'
import React, { FC, ReactNode } from 'react'
import { AmountPrintOptions, printEtherAmount, printTokenAmount } from './helpers'
import { BigNumber } from 'ethers'
import Badge from '../Badge'
import './TokenAmount.scss'

const ETH_SYMBOL = 'ETH'

type ColorProp = 'dark' | 'light' | 'primary' | 'secondary' | 'positive' | 'negative'
type SizeProp = 's' | 'm' | 'l' | 'xl'

interface TokenAmountProps {
  amount: BigNumber
  token?: Token
  color?: ColorProp
  size?: SizeProp
  amountPrintOptions?: AmountPrintOptions
  noSymbol?: boolean
  noBadge?: boolean
  className?: string
}

const TokenAmount: FC<TokenAmountProps> = ({
  amount,
  token,
  color = 'light',
  size,
  amountPrintOptions,
  noSymbol,
  noBadge,
  className,
}) => {
  const getPrintedAmount = () => {
    if (!amount) return '--'

    return token ? printTokenAmount(amount, token, amountPrintOptions) : printEtherAmount(amount, amountPrintOptions)
  }

  const renderAmount = (content: ReactNode) => {
    if (noBadge) return <span className={className}>{content}</span>

    return (
      <Badge color={color} size={size} className={className}>
        {content}
      </Badge>
    )
  }

  return (
    <>
      {renderAmount(
        <>
          {!noSymbol && <span className="my-tokenamount-symbol">{token ? token.symbol : ETH_SYMBOL}</span>}
          <span className="my-tokenamount-amount"> {getPrintedAmount()}</span>
        </>
      )}
    </>
  )
}

export default TokenAmount
