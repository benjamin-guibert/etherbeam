import { ContractType, LogType, TransactionStatus } from './types'

export interface LogData {
  log_type: LogType
  message: string
}

export interface TransactionMethodParameterData {
  index: number
  name: string
  raw_type: string
  raw_value: string
  decimal_value?: string
  addresses_attributes?: {
    index: number
    address_hash: string
  }[]
}

export interface TransactionActionData {
  contract_hash: string
  name: string
  parameters_attributes: TransactionMethodParameterData[]
}

export interface TransactionLogData extends TransactionActionData {
  index: number
}

export interface TransactionData {
  transaction_hash: string
  status: TransactionStatus
  block_number?: number
  datetime?: Date
  from_address_hash?: string
  to_address_hash?: string
  value?: string
  gas_used?: number
  gas_limit?: number
  gas_unit_price?: string
  transaction_method_action_attributes?: TransactionActionData
  transaction_method_logs_attributes?: TransactionLogData[]
  logs_attributes: LogData[]
}

export interface ContractData {
  sanitized_hash: string
  address_hash: string
  address_type: ContractType
  label: string
  abi: string
}

export interface TokenData extends ContractData {
  decimals: number
  price: string
}
