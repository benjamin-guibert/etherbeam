import axios from 'axios'
import { HttpStatus } from './api'
import { Transaction, Contract, Token } from './types'
import { getLogger } from './logger'
import { ContractData, TokenData, TransactionData } from './severTypes'
import { parseContractData, parseTokenData, parseTransactionToData } from './serverParsers'

const TIMEOUT = 30 * 1000
const RECEIPTS_TO_UPDATE = 20

const logger = getLogger()
const axiosClient = axios.create({
  baseURL: process.env.SERVER_API_HOST,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: TIMEOUT,
})

export const fetchContracts = async (): Promise<Contract[]> => {
  logger.debug('Fetching contracts...')

  const { data } = await axiosClient.get<ContractData[]>('contracts')

  logger.debug(`${data.length} contracts fetched.`)

  return data.map(parseContractData)
}

export const fetchTokens = async (): Promise<Token[]> => {
  logger.debug('Fetching tokens...')

  const { data } = await axiosClient.get<TokenData[]>('tokens')

  logger.debug(`${data.length} tokens fetched.`)

  return data.map(parseTokenData)
}

export const fetchTransactionsToUpdate = async (): Promise<string[]> => {
  logger.debug('Fetching transactions to update...')

  const { data } = await axiosClient.get<TransactionData[]>('block_transactions?status=mined')

  const transactions = data.map((transaction) => transaction.transaction_hash).slice(0, RECEIPTS_TO_UPDATE)
  logger.debug(`${transactions.length} transaction(s) to update.`)

  return transactions
}

export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  logger.debug(`Saving transaction ${transaction.hash}...`)
  const transactionData = parseTransactionToData(transaction)

  const { status } = await axiosClient.post('block_transactions', {
    block_transaction: transactionData,
  })

  const actionDone = status == HttpStatus.Created ? 'created' : 'updated'
  logger.debug(`Transaction ${transaction.hash} ${actionDone}.`)
}

export const saveTransactions = async (transactions: Transaction[]): Promise<void> => {
  logger.debug(`Saving ${transactions.length} transaction(s)...`)
  const transactionsData = transactions.map(parseTransactionToData)

  await axiosClient.post('block_transactions', {
    block_transactions: transactionsData,
  })

  logger.debug(`${transactionsData.length} transaction(s) saved.`)
}

export const updateTokenPrice = async (token: Token): Promise<boolean> => {
  logger.debug(`Updating price for token '${token.label}'...`)

  const { status } = await axiosClient.post(`tokens/${token.hash}/prices`, {
    token_price: {
      datetime: new Date(Date.now()),
      price: token.price,
    },
  })

  const result = status == HttpStatus.Created
  logger.debug(`Token '${token.label}' updated: ${result}.`)

  return result
}
