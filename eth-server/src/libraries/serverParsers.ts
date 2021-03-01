import {
  ContractData,
  LogData,
  TokenData,
  TransactionActionData,
  TransactionData,
  TransactionLogData,
  TransactionMethodParameterData,
} from './severTypes'
import {
  Contract,
  ContractType,
  Log,
  Token,
  Transaction,
  TransactionAction,
  TransactionLog,
  TransactionMethodParameter,
} from './types'

export const parseContractData = ({
  sanitized_hash,
  address_hash,
  address_type,
  label,
  abi,
}: ContractData): Contract => {
  return {
    sanitizedHash: sanitized_hash,
    hash: address_hash,
    type: address_type,
    label,
    abi,
  }
}

export const parseTokenData = ({ sanitized_hash, address_hash, label, abi, decimals, price }: TokenData): Token => {
  return {
    sanitizedHash: sanitized_hash,
    hash: address_hash,
    type: ContractType.Token,
    label,
    abi,
    decimals,
    price,
  }
}

const parseLogToData = ({ type, message }: Log): LogData => {
  return {
    log_type: type,
    message,
  }
}

const parseTransactionMethodParameterToData = ({
  index,
  name,
  type,
  value,
}: TransactionMethodParameter): TransactionMethodParameterData => {
  return {
    index,
    name,
    raw_type: type,
    raw_value: Array.isArray(value) ? JSON.stringify(value) : (value as string),
    decimal_value: type.startsWith('uint') ? (value as string) : null,
    addresses_attributes:
      type == 'address[]'
        ? (value as string[])?.map((value, index) => {
            return {
              index,
              address_hash: value,
            }
          })
        : null,
  }
}

const parseTransactionActionToData = ({ hash, name, parameters }: TransactionAction): TransactionActionData => {
  return {
    contract_hash: hash,
    name,
    parameters_attributes: parameters.map(parseTransactionMethodParameterToData),
  }
}

const parseTransactionLogToData = (log: TransactionLog): TransactionLogData => {
  const { index } = log
  return {
    index,
    ...parseTransactionActionToData(log),
  }
}

export const parseTransactionToData = (transaction: Transaction): TransactionData => {
  const {
    hash,
    status,
    blockNumber,
    dateTime,
    from,
    to,
    value,
    gasUsed,
    gasLimit,
    gasUnitPrice,
    action,
    logs,
    systemLogs,
  } = transaction

  return {
    transaction_hash: hash,
    status,
    block_number: blockNumber,
    datetime: dateTime,
    from_address_hash: from,
    to_address_hash: to,
    value: value?.toString(),
    gas_used: gasUsed,
    gas_limit: gasLimit,
    gas_unit_price: gasUnitPrice?.toString(),
    transaction_method_action_attributes: action ? parseTransactionActionToData(action) : null,
    transaction_method_logs_attributes: logs ? logs.map(parseTransactionLogToData) : null,
    logs_attributes: systemLogs.map(parseLogToData),
  }
}
