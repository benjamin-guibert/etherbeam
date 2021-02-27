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
  decimal_value?: string | null
  addresses_attributes?:
    | {
        index: number
        address_hash: string
      }[]
    | null
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
  logs_attributes: LogData[]
  transaction_hash: string
  status: TransactionStatus
  block_number?: number | null
  datetime?: Date | null
  from_address_hash?: string
  to_address_hash?: string | null
  value?: string | null
  gas_used?: number | null
  gas_limit?: number | null
  gas_unit_price?: string | null
  transaction_method_action_attributes?: TransactionActionData | null
  transaction_method_logs_attributes?: TransactionLogData[] | null
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
