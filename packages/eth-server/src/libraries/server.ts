import axios, { AxiosInstance } from 'axios'
import { AuthToken, getAuthHeaders, getAuthTokenFromResponse, HttpStatus } from './api'
import { Transaction, Contract, Token } from './types'
import { getLogger } from './logger'
import { ContractData, TokenData, TransactionData } from './severTypes'
import { parseContractData, parseTokenData, parseTransactionToData } from './serverParsers'

const TIMEOUT = 30 * 1000
const RECEIPTS_TO_UPDATE = 20

const logger = getLogger()

const setAuthToken = (data: ServerData, authToken: AuthToken): void => {
  data.authToken = authToken
  const authTokenHeaders = authToken ? getAuthHeaders(authToken) : {}
  data.axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...authTokenHeaders,
  }
}

export interface ServerData {
  axiosClient: AxiosInstance
  authToken: AuthToken
}

export const useServer = (): ServerData => {
  const data = {
    axiosClient: axios.create({
      baseURL: process.env.SERVER_API_HOST,
      timeout: TIMEOUT,
    }),
    authToken: null,
  }
  setAuthToken(data, null)

  return data
}

export const logIn = async (data: ServerData): Promise<void> => {
  const { SERVER_API_USER, SERVER_API_PASSWORD } = process.env
  logger.info(`Logging in as ${SERVER_API_USER}...`)

  const response = await data.axiosClient.post('auth/login', {
    email: SERVER_API_USER,
    password: SERVER_API_PASSWORD,
  })
  setAuthToken(data, getAuthTokenFromResponse(response))

  logger.info(`Logged in as ${SERVER_API_USER}.`)
}

export const logOut = async (data: ServerData): Promise<void> => {
  logger.info(`Logging out...`)

  if (!data.authToken) return logger.warn('No token found.')

  await data.axiosClient.post('auth/logout')
  setAuthToken(data, null)

  logger.info(`Logged out.`)
}

export const fetchContracts = async ({ axiosClient }: ServerData): Promise<Contract[]> => {
  logger.debug('Fetching contracts...')

  const { data } = await axiosClient.get<ContractData[]>('contracts')

  logger.debug(`${data.length} contracts fetched.`)

  return data.map(parseContractData)
}

export const fetchTokens = async ({ axiosClient }: ServerData): Promise<Token[]> => {
  logger.debug('Fetching tokens...')

  const { data } = await axiosClient.get<TokenData[]>('contract_tokens')

  logger.debug(`${data.length} tokens fetched.`)

  return data.map(parseTokenData)
}

export const fetchTransactionsToUpdate = async ({ axiosClient }: ServerData): Promise<string[]> => {
  logger.debug('Fetching transactions to update...')

  const { data } = await axiosClient.get<TransactionData[]>('block_transactions?status=mined')

  const transactions = data.map((transaction) => transaction.transaction_hash).slice(0, RECEIPTS_TO_UPDATE)
  logger.debug(`${transactions.length} transaction(s) to update.`)

  return transactions
}

export const saveTransaction = async (transaction: Transaction, { axiosClient }: ServerData): Promise<void> => {
  logger.debug(`Saving transaction ${transaction.hash}...`)
  const transactionData = parseTransactionToData(transaction)

  const { status } = await axiosClient.post('block_transactions', {
    block_transaction: transactionData,
  })

  const actionDone = status == HttpStatus.Created ? 'created' : 'updated'
  logger.debug(`Transaction ${transaction.hash} ${actionDone}.`)
}

export const saveTransactions = async (transactions: Transaction[], { axiosClient }: ServerData): Promise<void> => {
  logger.debug(`Saving ${transactions.length} transaction(s)...`)
  const transactionsData = transactions.map(parseTransactionToData)

  await axiosClient.post('block_transactions', {
    block_transactions: transactionsData,
  })

  logger.debug(`${transactionsData.length} transaction(s) saved.`)
}

export const updateTokenPrice = async (token: Token, { axiosClient }: ServerData): Promise<boolean> => {
  logger.debug(`Updating price for token '${token.label}'...`)

  const { status } = await axiosClient.post(`contract_tokens/${token.hash}/prices`, {
    contract_token_price: {
      datetime: new Date(Date.now()),
      price: token.price,
    },
  })

  const result = status == HttpStatus.Created
  logger.debug(`Token '${token.label}' updated: ${result}.`)

  return result
}
