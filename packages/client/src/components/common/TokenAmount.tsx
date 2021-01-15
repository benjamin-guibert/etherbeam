import { AddressType, Token } from 'libraries/ethereum/types'
import React, { ReactElement } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Badge from 'react-bootstrap/Badge'
import { AmountPrintOptions, printEtherAmount, printTokenAmount } from './helpers'
import { BigNumber } from 'ethers'

interface TokenAmountProps {
  amount: BigNumber
  token?: Token
  amountPrintOptions?: AmountPrintOptions
}

const TokenAmount = ({ amount, token, amountPrintOptions }: TokenAmountProps): ReactElement => {
  const getProperties = (): { overlay: string; amount: string; symbol: string } => {
    if (!token) {
      return {
        overlay: 'Ethereum',
        amount: printEtherAmount(amount, amountPrintOptions),
        symbol: 'ETH',
      }
    }

    if (token?.type != AddressType.Token) {
      return {
        overlay: `${amount} of unkown token`,
        amount: '...',
        symbol: '?',
      }
    }

    return {
      overlay: token.name,
      amount: printTokenAmount(amount, token, amountPrintOptions),
      symbol: token.symbol,
    }
  }

  const { overlay, amount: printedAmount, symbol: printedSymbol } = getProperties()

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="token-amount">{overlay}</Tooltip>}>
      <Badge variant="secondary" className="mx-2 text-monospace">
        <>
          <span className="pr-2">{printedSymbol}</span>
          <span>{printedAmount}</span>
        </>
      </Badge>
    </OverlayTrigger>
  )
}

export default TokenAmount
