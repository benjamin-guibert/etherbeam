import { BigNumber } from 'ethers'

export const WETH_HASH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
export const USDC_HASH = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

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
  chartPair?: string
  price?: BigNumber
  priceHistory: TokenPriceHistory[]
  website?: string
  whitepaper?: string
  github?: string
  linkedin?: string
  facebook?: string
  reddit?: string
  twitter?: string
  telegram?: string
  discord?: string
  actions?: TransactionAction[]
}

export interface Address {
  hash: string
  url: string
  type: AddressType
  label?: string
}

export interface Transaction {
  blockNumber?: number
  dateTime: Date
  address: Address
  status: TransactionStatus
  from?: Address
  to?: Address
  value?: BigNumber
  gas: {
    unitPrice?: BigNumber
    limit?: number
    used?: number
    ratio?: number
    price?: BigNumber
  }
  action?: TransactionMethod
  logs?: TransactionMethod[]
}

export interface TransactionMethod {
  contract: Address
  name: string
  parameters: TransactionMethodParameter[]
}

export type TransactionMethodValueType = string | BigNumber | Address | Address[]

export interface TransactionAction {
  index: number
  transaction: Transaction
  type: TransactionActionType
  direction: TransactionActionDirection
  holder: Address
  fromAddress?: Address | Token
  fromAmount?: BigNumber
  toAddress?: Address | Token
  toAmount?: BigNumber
}
