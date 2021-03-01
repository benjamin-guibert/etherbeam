import { getLogger } from './logger'
import { Transaction, TransactionStatus } from './types'
import { EthereumData } from './ethereum'
import { parseWeb3Transaction, parseWeb3TransactionReceipt } from './web3Parsers'

const logger = getLogger()

export const fetchBlockTransactions = async (
  data: EthereumData,
  blockNumber: number
): Promise<Transaction[] | null> => {
  logger.debug(`Fetching block #${blockNumber}...`)
  const web3Block = await data.web3.eth.getBlock(blockNumber, true)
  logger.debug(`Block #${blockNumber} fetched.`)

  if (!web3Block) return null

  const dateTime = new Date((web3Block.timestamp as number) * 1000)
  return web3Block.transactions.map((transaction) =>
    parseWeb3Transaction(data, transaction, TransactionStatus.mined, dateTime)
  )
}

export const fetchTransactionReceipt = async (data: EthereumData, hash: string): Promise<Transaction | null> => {
  logger.trace(`Fetching receipt for transaction '${hash}'...`)
  const web3Transaction = await data.web3.eth.getTransactionReceipt(hash)
  logger.trace(`Receipt fetched for transaction '${hash}'.`)

  return web3Transaction ? parseWeb3TransactionReceipt(data, web3Transaction) : null
}

export const fetchPendingTransaction = async (data: EthereumData, hash: string): Promise<Transaction | null> => {
  logger.trace(`Fetching pending transaction '${hash}'.`)
  const web3Transaction = await data.web3.eth.getTransaction(hash)
  logger.trace(`Transaction '${hash}' fetched.`)

  const dateTime = new Date()
  return web3Transaction ? parseWeb3Transaction(data, web3Transaction, TransactionStatus.pending, dateTime) : null
}
