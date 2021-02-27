import { BigNumber } from 'ethers'
import orderBy from 'lodash/orderBy'
import {
  TransactionData,
  TokenData,
  AddressData,
  TokenActionData,
  TransactionMethodParameterData,
  TransactionMethodData,
  UserData,
} from './serverTypes'
import {
  Transaction,
  Token,
  HistoryTime,
  Address,
  AddressType,
  TransactionMethodValueType,
  TransactionAction,
  TransactionActionDirection,
  TransactionMethodParameter,
  TransactionMethodParameterType,
  TransactionMethod,
  User,
} from './types'
import { createTransactionAddress, getEtherscanUrl } from './ethereum'

const parseBigNumberFromServer = (value: string): BigNumber => BigNumber.from(value.split('.')[0])

export const parseUserData = ({ name, email, user_type }: UserData): User => {
  return {
    name,
    email,
    type: user_type,
  }
}

export const parseAddressData = ({ address_hash, address_type, label }: AddressData): Address => {
  return {
    hash: address_hash,
    type: address_type,
    label,
    url: getEtherscanUrl('address', address_hash),
  }
}

const parseHashData = (hash: string, address?: AddressData | TokenData): Address => {
  if (!address) {
    return {
      hash,
      type: AddressType.Unknown,
      url: getEtherscanUrl('address', hash),
    }
  }

  switch (address.address_type) {
    case AddressType.Token:
      return parseTokenData(address as TokenData)
    default:
      return parseAddressData(address)
  }
}

const parseTransactionMethodValueType = ({
  parameter_type,
  decimal_value,
  addresses,
}: TransactionMethodParameterData): TransactionMethodValueType => {
  switch (parameter_type) {
    case TransactionMethodParameterType.UnsignedInteger:
      return decimal_value ? parseBigNumberFromServer(decimal_value) : null
    case TransactionMethodParameterType.Address:
      return addresses && addresses?.length > 0 ? parseHashData(addresses[0].address_hash, addresses[0].address) : null
    case TransactionMethodParameterType.Addresses:
      return addresses ? addresses.map((address) => parseHashData(address.address_hash, address.address)) : null
    default:
      return null
  }
}

const parseTransactionMethodParameter = (parameter: TransactionMethodParameterData): TransactionMethodParameter => {
  const { name, parameter_type, raw_type } = parameter

  return {
    name,
    type: parameter_type,
    rawType: raw_type,
    value: parseTransactionMethodValueType(parameter),
  }
}

const parseTransactionMethodData = ({ contract, name, parameters }: TransactionMethodData): TransactionMethod => {
  return {
    contract: parseAddressData(contract),
    name,
    parameters: parameters.map((parameter) => parseTransactionMethodParameter(parameter)),
  }
}

export const parseTransactionData = ({
  transaction_hash,
  status,
  datetime,
  block_number,
  from_address_hash,
  from_address,
  to_address_hash,
  to_address,
  value,
  gas_unit_price,
  gas_limit,
  gas_used,
  gas_ratio,
  gas_fee,
  transaction_method_action,
  transaction_method_logs,
}: TransactionData): Transaction => {
  return {
    blockNumber: block_number,
    dateTime: datetime,
    address: createTransactionAddress(transaction_hash),
    status,
    from: from_address_hash ? parseHashData(from_address_hash, from_address) : null,
    to: to_address_hash ? parseHashData(to_address_hash, to_address) : null,
    value: value ? parseBigNumberFromServer(value) : null,
    gas: {
      unitPrice: gas_unit_price ? parseBigNumberFromServer(gas_unit_price) : null,
      limit: gas_limit,
      used: gas_used,
      ratio: gas_ratio,
      price: gas_fee ? parseBigNumberFromServer(gas_fee) : null,
    },
    action: transaction_method_action ? parseTransactionMethodData(transaction_method_action) : null,
    logs: transaction_method_logs?.map((log) => parseTransactionMethodData(log)),
  }
}

const parseTokenActionData = (
  {
    block_transaction,
    holder_address_hash,
    holder_address,
    index,
    action_type,
    from_address,
    from_address_hash,
    from_amount,
    to_address,
    to_address_hash,
    to_amount,
  }: TokenActionData,
  direction: TransactionActionDirection
): TransactionAction => {
  return {
    transaction: parseTransactionData(block_transaction),
    type: action_type,
    direction,
    index,
    holder: parseHashData(holder_address_hash, holder_address),
    fromAddress: from_address_hash ? parseHashData(from_address_hash, from_address) : null,
    fromAmount: from_amount ? parseBigNumberFromServer(from_amount) : null,
    toAddress: to_address_hash ? parseHashData(to_address_hash, to_address) : null,
    toAmount: to_amount ? parseBigNumberFromServer(to_amount) : null,
  }
}

export const parseTokenData = (data: TokenData): Token => {
  const {
    address_hash,
    name,
    description,
    symbol,
    decimals,
    chart_pair,
    price,
    price_1h,
    price_1h_ratio,
    price_1d,
    price_1d_ratio,
    price_1w,
    price_1w_ratio,
    price_1m,
    price_1m_ratio,
    price_1y,
    price_1y_ratio,
    website,
    whitepaper,
    github,
    linkedin,
    facebook,
    reddit,
    twitter,
    telegram,
    discord,
    from_transaction_actions,
    to_transaction_actions,
  } = data
  const priceHistory = []
  if (price_1h && price_1h_ratio) {
    priceHistory.push({
      time: HistoryTime.Hour,
      price: parseBigNumberFromServer(price_1h),
      ratio: price_1h_ratio as number,
    })
  }
  if (price_1d && price_1d_ratio) {
    priceHistory.push({
      time: HistoryTime.Day,
      price: parseBigNumberFromServer(price_1d),
      ratio: price_1d_ratio as number,
    })
  }
  if (price_1w && price_1w_ratio) {
    priceHistory.push({
      time: HistoryTime.Week,
      price: parseBigNumberFromServer(price_1w),
      ratio: price_1w_ratio as number,
    })
  }
  if (price_1m && price_1m_ratio) {
    priceHistory.push({
      time: HistoryTime.Month,
      price: parseBigNumberFromServer(price_1m),
      ratio: price_1m_ratio as number,
    })
  }
  if (price_1y && price_1y_ratio) {
    priceHistory.push({
      time: HistoryTime.Year,
      price: parseBigNumberFromServer(price_1y),
      ratio: price_1y_ratio as number,
    })
  }

  const fromActions = from_transaction_actions
    ? from_transaction_actions.map((action) => parseTokenActionData(action, TransactionActionDirection.Sell))
    : []
  const toActions = to_transaction_actions
    ? to_transaction_actions.map((action) => parseTokenActionData(action, TransactionActionDirection.Buy))
    : []
  const actions =
    from_transaction_actions || to_transaction_actions
      ? orderBy([...fromActions, ...toActions], ['transaction.dateTime', 'index'], ['desc', 'desc'])
      : null

  return {
    ...parseAddressData(data),
    type: AddressType.Token,
    url: getEtherscanUrl('token', address_hash),
    name,
    description,
    symbol,
    decimals,
    chartPair: chart_pair,
    price: price ? parseBigNumberFromServer(price) : null,
    priceHistory,
    website,
    whitepaper,
    github,
    linkedin,
    facebook,
    reddit,
    twitter,
    telegram,
    discord,
    actions,
  }
}
