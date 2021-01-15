import { TokenData, TransactionData } from 'libraries/ethereum/serverTypes'
import { AddressType, TransactionStatus } from 'libraries/ethereum/types'

export const createTransactionData = (
  hash = '0x0000000000000000000000000000000000000000000000000000000000000001'
): TransactionData => {
  return {
    transaction_hash: hash,
    status: TransactionStatus.Validated,
    datetime: new Date(2020, 4, 5, 11, 22, 33),
    from_address_hash: '0x0000000000000000000000000000000000000111',
    value: '100000000000000000000.0',
    gas_unit_price: '100.0',
    gas_limit: 10000,
  }
}

export const createTokenData = (hash: string): TokenData => {
  return {
    address_hash: hash,
    address_type: AddressType.Token,
    label: 'Token (TKN)',
    name: 'Token',
    symbol: 'TKN',
    decimals: 18,
    price: '2000',
    price_1h: '1000',
    price_1h_ratio: 2.0,
    price_1d: '4000',
    price_1d_ratio: 0.5,
    price_1w: '8000',
    price_1w_ratio: 0.25,
    price_1m: '2000',
    price_1m_ratio: 1.0,
    price_1y: '500',
    price_1y_ratio: 4.0,
  }
}
