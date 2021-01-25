import axios from 'axios'
import compact from 'lodash/compact'
import { HttpStatus, getPagination, PaginatedContent } from 'libraries/api'
import { Token, Transaction, USDC_HASH, WETH_HASH } from './types'
import { TokenData, TransactionData } from './serverTypes'
import { parseTokenData, parseTransactionData } from './serverParsers'

const TIMEOUT = 60 * 1000
const TRANSACTIONS_PER_PAGE = 20

const axiosClient = axios.create({
  baseURL: process.env.SERVER_API_HOST,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: TIMEOUT,
})

export const fetchTokens = async (): Promise<Token[]> => {
  const { data } = await axiosClient.get<TokenData[]>('tokens')
  const ignoredHashes = [WETH_HASH, USDC_HASH]

  return compact(data.map((token) => (!ignoredHashes.includes(token.address_hash) ? parseTokenData(token) : null)))
}

export const fetchToken = async (address: string, withList?: 'actions'): Promise<Token> => {
  const config = {
    validateStatus: (status: number) => [HttpStatus.Ok, HttpStatus.NotFound].includes(status),
  }

  const { data } = await axiosClient.get<TokenData>(`tokens/${address}?list=${withList || ''}`, config)

  return data ? parseTokenData(data) : null
}

export const fetchPendingTransactions = async (page: number): Promise<PaginatedContent<Transaction>> => {
  const response = await axiosClient.get<TransactionData[]>(
    `block_transactions/pending?items=${TRANSACTIONS_PER_PAGE}&page=${page}`
  )

  return {
    items: response.data.map((transaction) => parseTransactionData(transaction)),
    pagination: getPagination(response),
  }
}
