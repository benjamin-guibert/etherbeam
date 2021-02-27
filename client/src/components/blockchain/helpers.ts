import { faCoins, faFile, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { BigNumber, ethers } from 'ethers'
import numeral from 'numeral'
import { AddressType, Token } from '../../libraries/types'

const ETH_DECIMALS = 18
const MAX_DECIMALS = 13
const UNISWAP_SWAP_URL = 'https://app.uniswap.org/#/swap'

export interface AmountPrintOptions {
  forceDecimals?: boolean
  decimals?: number
}

const printAmount = (amount: string | null, decimals: number, options?: AmountPrintOptions | null): string => {
  const { forceDecimals, decimals: forcedDecimals } = options ?? {}
  const decimalsCount = Math.min(forcedDecimals || decimals, MAX_DECIMALS)
  const decimalFormat = forceDecimals ? '0'.repeat(decimalsCount) : `[${'0'.repeat(decimalsCount)}]`

  return amount ? numeral(amount).format(`0,0.${decimalFormat}`) : '?'
}

export type Unit = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'ether'

export const printEtherAmount = (amount: BigNumber | null, options?: AmountPrintOptions | null, unit?: Unit): string =>
  printAmount(amount ? ethers.utils.formatUnits(amount, unit) : null, ETH_DECIMALS, options)

export const printTokenAmount = (
  amount: BigNumber | null,
  token: Token,
  options?: AmountPrintOptions | null
): string => {
  const { decimals } = token

  return printAmount(amount ? ethers.utils.formatUnits(amount, decimals) : null, decimals, options)
}

export const shortenAddress = (address: string): string => {
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 4)

  return `${start}...${end}`
}

export const getAddressTypeIcon = (type: AddressType): IconDefinition | null => {
  switch (type) {
    case AddressType.Wallet:
      return faWallet
    case AddressType.Contract:
      return faFile
    case AddressType.Token:
      return faCoins
    default:
      return null
  }
}

export const getUniswapTradeUrl = (inputHash: string | null, outputHash: string | null): string => {
  return `${UNISWAP_SWAP_URL}?${inputHash ? `inputCurrency=${inputHash}&` : ''}${
    outputHash ? `outputCurrency=${outputHash}` : ''
  }`
}
