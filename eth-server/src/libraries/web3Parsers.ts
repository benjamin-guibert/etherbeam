import Web3 from 'web3'
import compact from 'lodash/compact'
import { Transaction as Web3Transaction } from 'web3-eth'
import { TransactionReceipt } from 'web3-core'
import { EthereumData } from './ethereum'
import { sanitizeHash } from './helpers'
import { getLogger } from './logger'
import { LogType, Transaction, TransactionAction, TransactionLog, TransactionStatus } from './types'

const logger = getLogger()

type ContractMethodType = {
  name: string
  anonymous: boolean
  inputs: { name: string; type: string }[]
}

const decodeContractMethodData = (
  { contracts, web3 }: EthereumData,
  hash: string,
  data: string,
  index?: number,
  topics?: string[]
): TransactionAction | TransactionLog | null => {
  if (!hash) return null
  const contract = contracts.find((contract) => contract.sanitizedHash == sanitizeHash(hash))
  if (!contract) return null
  if (!contract || !data || data == '0x') return null

  const methodId = topics ? topics[0] : data.slice(0, 10)
  const method: ContractMethodType = (contract.web3 as any)._jsonInterface // eslint-disable-line @typescript-eslint/no-explicit-any
    .find((method: { signature: string }) => method.signature == methodId)

  if (!method) return null

  let values: { [key: string]: string }
  if (topics) {
    const selectedTopics = method.anonymous ? topics : topics.slice(1)
    values = web3.eth.abi.decodeLog(method.inputs, data.slice(2), selectedTopics)
  } else {
    values = web3.eth.abi.decodeParameters(method.inputs, data.slice(10))
  }

  return {
    index,
    hash: contract.hash,
    name: method.name,
    parameters: method.inputs.map(({ name, type }, index) => {
      return {
        index,
        name,
        type,
        value: values[name],
      }
    }),
  }
}

const decodeTransactionActionData = (
  data: EthereumData,
  transaction: Transaction,
  { to, input }: Web3Transaction
): void => {
  try {
    transaction.action = decodeContractMethodData(data, to as string, input)
  } catch (error) {
    if (transaction.status == TransactionStatus.cancelled) return

    transaction.systemLogs.push({ type: LogType.Error, message: 'Error while decoding action data.' })
    logger.error(`Error while decoding action data for transaction ${transaction.hash}.`)
    logger.error(error.stack)
  }
}

const decodeTransactionLogsData = (
  data: EthereumData,
  transaction: Transaction,
  { logs }: TransactionReceipt
): void => {
  try {
    transaction.logs = compact(
      logs.map((log) => {
        const { address, logIndex, data: logData, topics } = log
        return decodeContractMethodData(data, address, logData, logIndex, topics)
      })
    ) as TransactionLog[]
  } catch (error) {
    if (transaction.status == TransactionStatus.cancelled) return

    transaction.systemLogs.push({ type: LogType.Error, message: 'Error while decoding log data.' })
    logger.error(`Error while decoding log data for transaction ${transaction.hash}.`)
    logger.error(error.stack)
  }
}

const parseReceiptStatus = (status: boolean): TransactionStatus => {
  switch (status) {
    case true:
      return TransactionStatus.validated
    case false:
      return TransactionStatus.cancelled
    default:
      return TransactionStatus.mined
  }
}

export const parseWeb3Transaction = (
  data: EthereumData,
  web3Transaction: Web3Transaction,
  status: TransactionStatus,
  dateTime?: Date
): Transaction => {
  const { hash, blockNumber, from, to, value, gas, gasPrice } = web3Transaction
  const transaction = {
    hash: sanitizeHash(hash),
    status,
    dateTime,
    blockNumber: blockNumber,
    from: sanitizeHash(from),
    to: to ? sanitizeHash(to) : null,
    value: Web3.utils.toBN(value),
    gasLimit: gas,
    gasUnitPrice: Web3.utils.toBN(gasPrice),
    systemLogs: [],
  }

  decodeTransactionActionData(data, transaction, web3Transaction)

  return transaction
}

export const parseWeb3TransactionReceipt = (data: EthereumData, web3Transaction: TransactionReceipt): Transaction => {
  const { transactionHash, blockNumber, status, from, to, gasUsed } = web3Transaction
  const transaction = {
    hash: sanitizeHash(transactionHash),
    status: parseReceiptStatus(status),
    blockNumber,
    from: sanitizeHash(from),
    to: sanitizeHash(to),
    gasUsed,
    systemLogs: [],
  }

  decodeTransactionLogsData(data, transaction, web3Transaction)

  return transaction
}
