import { Address, AddressType } from './types'

const ETHERSCAN_URL_BASE = 'https://etherscan.io/'

export type EtherscanUrlType = 'block' | 'tx' | 'token' | 'address'

export const getEtherscanUrl = (type: EtherscanUrlType, id: string | number): string => {
  return `${ETHERSCAN_URL_BASE}${type}/${id}`
}

export const createTransactionAddress = (hash: string): Address => {
  return {
    hash,
    type: AddressType.Transaction,
    url: getEtherscanUrl('tx', hash),
  }
}
