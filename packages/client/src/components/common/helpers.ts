import { faDotCircle, faFile, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import numeral from 'numeral'
import { AddressType, Token } from 'libraries/ethereum/types'
import { BigNumber, ethers } from 'ethers'

const ETH_SYMBOL = 'ETH'
const ETH_DECIMALS = 18

export interface AmountPrintOptions {
  forceDecimals?: boolean
  decimals?: number
  withSymbol?: boolean
}

const printAmount = (amount: string, symbol: string, decimals: number, options?: AmountPrintOptions): string => {
  const { forceDecimals, decimals: forcedDecimals, withSymbol } = options ?? {}
  const decimalsCount = forcedDecimals ?? decimals
  const decimalFormat = forceDecimals ? '0'.repeat(decimalsCount) : `[${'0'.repeat(decimalsCount)}]`
  const printedAmount = amount ? numeral(amount).format(`0,0.${decimalFormat}`) : '?'

  return `${withSymbol ? `${symbol} ` : ''}${printedAmount}`
}

export type Unit = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'ether'

export const printEtherAmount = (amount: BigNumber, options?: AmountPrintOptions, unit?: Unit): string =>
  printAmount(amount ? ethers.utils.formatUnits(amount, unit) : null, ETH_SYMBOL, ETH_DECIMALS, options)

export const printTokenAmount = (amount: BigNumber, token: Token, options?: AmountPrintOptions): string => {
  const { symbol, decimals } = token

  return printAmount(amount ? ethers.utils.formatUnits(amount, decimals) : null, symbol, decimals, options)
}

export const shortenAddress = (address: string): string => {
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 4)

  return `${start}...${end}`
}

export const getAddressTypeIcon = (type: AddressType): IconDefinition => {
  switch (type) {
    case AddressType.Contract:
      return faFile
    case AddressType.Token:
      return faDotCircle
    default:
      return null
  }
}
