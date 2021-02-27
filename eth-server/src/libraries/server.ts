import { getLogger } from './logger'
import { ApiClient, callApi, createApiClient, flushAuthToken, HttpStatus, RestAction } from '@cryptotentanz/api-client'
import { Transaction, Contract, Token } from './types'
import { ContractData, TokenData, TransactionData } from './severTypes'
import { parseContractData, parseTokenData, parseTransactionToData } from './serverParsers'

const TIMEOUT = 30 * 1000
const RECEIPTS_TO_UPDATE = 20

const logger = getLogger()

export const initializeApiClient = (): ApiClient =>
  createApiClient(process.env.SERVER_API_HOST as string, true, TIMEOUT)

export const signIn = async (apiClient: ApiClient): Promise<void> => {
  const { SERVER_API_USER, SERVER_API_PASSWORD } = process.env
  logger.info(`Signing in as ${SERVER_API_USER}...`)
  const payload = {
    email: SERVER_API_USER,
    password: SERVER_API_PASSWORD,
  }
  flushAuthToken(apiClient)

  await callApi(apiClient, RestAction.Post, 'auth/sign_in', [HttpStatus.Ok], null, payload, true)

  logger.info(`Signed in as ${SERVER_API_USER}.`)
}

export const signOut = async (apiClient: ApiClient): Promise<boolean> => {
  logger.info(`Signing out...`)

  const { status } = await callApi(apiClient, RestAction.Delete, 'auth/sign_out', [HttpStatus.Ok, HttpStatus.NotFound])
  flushAuthToken(apiClient)

  const result = status == HttpStatus.Ok
  logger.info(`Signed out: ${result}`)

  return result
}

export const fetchContracts = async (apiClient: ApiClient): Promise<Contract[]> => {
  logger.debug('Fetching contracts...')

  const { data } = await callApi<ContractData[]>(apiClient, RestAction.Get, 'contracts')

  logger.debug(`${data.length} contracts fetched.`)

  return data.map(parseContractData)
}

export const fetchTokens = async (apiClient: ApiClient): Promise<Token[]> => {
  logger.debug('Fetching tokens...')

  const { data } = await callApi<TokenData[]>(apiClient, RestAction.Get, 'contract_tokens')

  logger.debug(`${data.length} tokens fetched.`)

  return data.map(parseTokenData)
}

export const fetchTransactionsToUpdate = async (apiClient: ApiClient): Promise<string[]> => {
  logger.debug('Fetching transactions to update...')

  const { data } = await callApi<TransactionData[]>(apiClient, RestAction.Get, 'block_transactions?status=mined')

  const transactions = data.map((transaction) => transaction.transaction_hash).slice(0, RECEIPTS_TO_UPDATE)
  logger.debug(`${transactions.length} transaction(s) to update.`)

  return transactions
}

export const saveTransaction = async (apiClient: ApiClient, transaction: Transaction): Promise<void> => {
  logger.debug(`Saving transaction ${transaction.hash}...`)
  const payload = {
    block_transaction: parseTransactionToData(transaction),
  }

  const { status } = await callApi(
    apiClient,
    RestAction.Post,
    'block_transactions',
    [HttpStatus.Ok, HttpStatus.Created],
    null,
    payload
  )

  logger.debug(`Transaction ${transaction.hash} ${status == HttpStatus.Created ? 'created' : 'updated'}.`)
}

export const saveTransactions = async (apiClient: ApiClient, transactions: Transaction[]): Promise<void> => {
  logger.debug(`Saving ${transactions.length} transaction(s)...`)
  const payload = {
    block_transactions: transactions.map(parseTransactionToData),
  }

  await callApi(apiClient, RestAction.Post, 'block_transactions', [HttpStatus.Ok], null, payload)

  logger.debug(`${transactions.length} transaction(s) saved.`)
}

export const updateTokenPrice = async (apiClient: ApiClient, token: Token): Promise<boolean> => {
  logger.debug(`Updating price for token '${token.label}'...`)
  const payload = {
    contract_token_price: {
      datetime: new Date(Date.now()),
      price: token.price,
    },
  }

  const { status } = await callApi(
    apiClient,
    RestAction.Post,
    `contract_tokens/${token.hash}/prices`,
    [HttpStatus.Ok, HttpStatus.Created],
    null,
    payload
  )

  const created = status == HttpStatus.Created
  logger.debug(`Token ${token.label} ${created ? 'created' : 'updated'}.`)

  return created
}
