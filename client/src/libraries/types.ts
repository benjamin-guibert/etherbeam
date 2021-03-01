import { BigNumber } from 'ethers'

export const WETH_HASH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
export const USDC_HASH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

export enum UserType {
  User = 'user',
  Administrator = 'administrator',
}

export enum AddressType {
  Unknown = 'unknown',
  Wallet = 'wallet',
  Token = 'token',
  Contract = 'contract',
  Transaction = 'transaction',
}

export enum TransactionMethodParameterType {
  Unknown = 'unknown',
  UnsignedInteger = 'unsigned_integer',
  Address = 'address',
  Addresses = 'addresses',
}

export enum TransactionStatus {
  Pending = 'pending',
  Mined = 'mined',
  Validated = 'validated',
  Cancelled = 'cancelled',
}

export enum TransactionActionType {
  Unknown = 'unknown',
  Approval = 'approval',
  Transfer = 'transfer',
  Swap = 'swap',
}

export enum TransactionActionDirection {
  Buy = 'buy',
  Sell = 'sell',
}

export interface User {
  name: string
  email: string
  type: UserType
}

export interface TransactionMethodParameter {
  name: string
  type: TransactionMethodParameterType
  rawType: string
  value: TransactionMethodValueType
}

export enum HistoryTime {
  Hour = 'h',
  Day = 'd',
  Week = 'w',
  Month = 'm',
  Year = 'y',
}

export interface TokenPriceHistory {
  time: HistoryTime
  price: BigNumber
  ratio: number
}

export interface Token extends Address {
  name: string
  description?: string
  symbol: string
  decimals: number
  chartPair?: string | null
  price?: BigNumber | null
  priceHistory: TokenPriceHistory[]
  website?: string | null
  whitepaper?: string | null
  github?: string | null
  linkedin?: string | null
  facebook?: string | null
  reddit?: string | null
  twitter?: string | null
  telegram?: string | null
  discord?: string | null
  actions?: TransactionAction[] | null
}

export interface Address {
  hash: string
  url: string
  type: AddressType
  label?: string
}

export interface Transaction {
  blockNumber?: number | null
  dateTime: Date
  address: Address
  status: TransactionStatus
  from?: Address | null
  to?: Address | null
  value?: BigNumber | null
  gas: {
    unitPrice?: BigNumber | null
    limit?: number | null
    used?: number | null
    ratio?: number | null
    price?: BigNumber | null
  }
  action?: TransactionMethod | null
  logs?: TransactionMethod[] | null
}

export interface TransactionMethod {
  contract: Address
  name: string
  parameters: TransactionMethodParameter[]
}

export type TransactionMethodValueType = string | BigNumber | Address | Address[] | null

export interface TransactionAction {
  index: number
  transaction: Transaction
  type: TransactionActionType
  direction?: TransactionActionDirection
  holder: Address
  fromAddress?: Address | Token | null
  fromAmount?: BigNumber | null
  toAddress?: Address | Token | null
  toAmount?: BigNumber | null
}
