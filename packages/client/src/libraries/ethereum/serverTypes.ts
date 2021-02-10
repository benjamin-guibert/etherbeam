import { AddressType, TransactionActionType, TransactionMethodParameterType, TransactionStatus } from './types'

export interface AddressData {
  address_hash: string
  address_type: AddressType
  label: string
}

export interface TransactionMethodParameterData {
  name: string
  parameter_type: TransactionMethodParameterType
  raw_type: string
  raw_value?: string
  decimal_value?: string
  addresses?: {
    address_hash: string
    address?: AddressData
  }[]
}

export interface TokenData extends AddressData {
  name: string
  symbol: string
  decimals: number
  chart_pair?: string
  description?: string
  price?: string
  price_1h?: string
  price_1h_ratio?: number
  price_1d?: string
  price_1d_ratio?: number
  price_1w?: string
  price_1w_ratio?: number
  price_1m?: string
  price_1m_ratio?: number
  price_1y?: string
  price_1y_ratio?: number
  website?: string
  whitepaper?: string
  github?: string
  linkedin?: string
  facebook?: string
  reddit?: string
  twitter?: string
  telegram?: string
  discord?: string
  from_transaction_actions?: TokenActionData[]
  to_transaction_actions?: TokenActionData[]
}

export interface TransactionData {
  transaction_hash: string
  status: TransactionStatus
  datetime: Date
  block_number?: number
  from_address_hash?: string
  from_address?: AddressData
  to_address_hash?: string
  to_address?: AddressData
  value?: string
  gas_unit_price?: string
  gas_limit?: number
  gas_used?: number
  gas_ratio?: number
  gas_fee?: string
  transaction_method_action?: TransactionMethodData
  transaction_method_logs?: TransactionMethodData[]
}

export interface TransactionMethodData {
  contract: AddressData
  name: string
  parameters: TransactionMethodParameterData[]
}

export interface TokenActionData {
  block_transaction: TransactionData
  index: number
  action_type: TransactionActionType
  holder_address_hash: string
  holder_address?: AddressData
  from_address_hash?: string
  from_address?: AddressData | TokenData
  from_amount?: string
  to_address_hash?: string
  to_address?: AddressData | TokenData
  to_amount?: string
}
