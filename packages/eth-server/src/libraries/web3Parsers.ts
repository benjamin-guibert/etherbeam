import Web3 from 'web3'
import compact from 'lodash/compact'
import { Transaction as Web3Transaction } from 'web3-eth'
import { TransactionReceipt } from 'web3-core'
import { EthereumData } from './ethereum'
import { sanitizeHash } from './helpers'
import { getLogger } from './logger'
import { LogType, Transaction, TransactionAction, TransactionLog, TransactionStatus } from './types'

const logger = getLogger()

const decodeContractMethodData = (
  hash: string,
  data: string,
  { contracts, web3 }: EthereumData,
  index?: number,
  topics?: string[]
): TransactionAction | TransactionLog => {
  const contract = contracts.find((contract) => contract.sanitizedHash == sanitizeHash(hash))
  if (!contract) return null
  if (!contract || !data || data == '0x') return null

  const methodId = topics ? topics[0] : data.slice(0, 10)
  const method = (contract.web3 as any)._jsonInterface // eslint-disable-line @typescript-eslint/no-explicit-any
    .find((method: { signature: string }) => method.signature == methodId)

  if (!method) return null

  let values = undefined
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
  transaction: Transaction,
  { to, input }: Web3Transaction,
  data: EthereumData
): void => {
  try {
    transaction.action = decodeContractMethodData(to, input, data)
  } catch (error) {
    if (transaction.status == TransactionStatus.cancelled) return

    transaction.systemLogs.push({ type: LogType.Error, message: 'Error while decoding action data.' })
    logger.error(`Error while decoding action data for transaction ${transaction.hash}.`)
    logger.error(error.stack)
  }
}

const decodeTransactionLogsData = (
  transaction: Transaction,
  { logs }: TransactionReceipt,
  data: EthereumData
): void => {
  try {
    transaction.logs = compact(
      logs.map((log) => {
        const { address, logIndex, data: logData, topics } = log
        return decodeContractMethodData(address, logData, data, logIndex, topics)
      })
    )
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
  web3Transaction: Web3Transaction,
  status: TransactionStatus,
  data: EthereumData,
  dateTime?: Date
): Transaction => {
  const { hash, blockNumber, from, to, value, gas, gasPrice } = web3Transaction
  const transaction = {
    hash: sanitizeHash(hash),
    status,
    dateTime,
    blockNumber: blockNumber,
    from: sanitizeHash(from),
    to: sanitizeHash(to),
    value: Web3.utils.toBN(value),
    gasLimit: gas,
    gasUnitPrice: Web3.utils.toBN(gasPrice),
    systemLogs: [],
  }

  decodeTransactionActionData(transaction, web3Transaction, data)

  return transaction
}

export const parseWeb3TransactionReceipt = (web3Transaction: TransactionReceipt, data: EthereumData): Transaction => {
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

  decodeTransactionLogsData(transaction, web3Transaction, data)

  return transaction
}
