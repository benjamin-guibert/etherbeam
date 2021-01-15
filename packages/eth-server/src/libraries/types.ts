import { Contract as Web3Contract } from 'web3-eth-contract'
import BN from 'bn.js'

export const WETH_HASH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
export const WETH_DECIMALS = 18
export const USDC_HASH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

export enum LogType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum ContractType {
  Contract = 'contract',
  Token = 'token',
}

export enum TransactionStatus {
  pending = 'pending',
  mined = 'mined',
  validated = 'validated',
  cancelled = 'cancelled',
}

export interface Log {
  type: LogType
  message: string
}

export interface Contract {
  sanitizedHash: string
  hash: string
  type: ContractType
  label: string
  abi: string
  web3?: Web3Contract
}

export interface Token extends Contract {
  decimals: number
  price: string
}

export interface TransactionMethodParameter {
  index: number
  name: string
  type: string
  value: string | string[]
}

export interface TransactionAction {
  hash: string
  name: string
  parameters: TransactionMethodParameter[]
}

export interface TransactionLog extends TransactionAction {
  index: number
}

export interface Transaction {
  hash: string
  status: TransactionStatus
  blockNumber: number
  dateTime?: Date
  from?: string
  to?: string
  value?: BN
  gasUsed?: number
  gasLimit?: number
  gasUnitPrice?: BN
  action?: TransactionAction
  logs?: TransactionLog[]
  systemLogs: Log[]
}
