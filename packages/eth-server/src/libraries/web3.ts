import { EthereumData } from './ethereum'
import { getLogger } from './logger'
import { Transaction, TransactionStatus } from './types'
import { parseWeb3Transaction, parseWeb3TransactionReceipt } from './web3Parsers'

const logger = getLogger()

export const fetchBlockTransactions = async (blockNumber: number, data: EthereumData): Promise<Transaction[]> => {
  logger.debug(`Fetching block #${blockNumber}...`)
  const web3Block = await data.web3.eth.getBlock(blockNumber, true)
  logger.debug(`Block #${blockNumber} fetched.`)

  if (!web3Block) return null

  const dateTime = new Date((web3Block.timestamp as number) * 1000)
  return web3Block.transactions.map((transaction) =>
    parseWeb3Transaction(transaction, TransactionStatus.mined, data, dateTime)
  )
}

export const fetchTransactionReceipt = async (hash: string, data: EthereumData): Promise<Transaction> => {
  logger.trace(`Fetching receipt for transaction '${hash}'...`)
  const web3Transaction = await data.web3.eth.getTransactionReceipt(hash)
  logger.trace(`Receipt fetched for transaction '${hash}'.`)

  return web3Transaction ? parseWeb3TransactionReceipt(web3Transaction, data) : null
}

export const fetchPendingTransaction = async (hash: string, data: EthereumData): Promise<Transaction> => {
  logger.trace(`Fetching pending transaction '${hash}'.`)
  const web3Transaction = await data.web3.eth.getTransaction(hash)
  logger.trace(`Transaction '${hash}' fetched.`)

  const dateTime = new Date()
  return web3Transaction ? parseWeb3Transaction(web3Transaction, TransactionStatus.pending, data, dateTime) : null
}
