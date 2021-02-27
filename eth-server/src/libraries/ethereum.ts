import { getLogger } from './logger'
import fs from 'fs'
import Web3 from 'web3'
import { isTransactionWatched, sleep, tryAction } from './helpers'
import { Contract, ContractType, Token, Transaction, WETH_HASH } from './types'
import {
  fetchContracts,
  fetchTokens,
  fetchTransactionsToUpdate,
  saveTransaction,
  saveTransactions,
  updateTokenPrice,
} from './server'
import { BlockHeader } from 'web3-eth'
import { Subscription } from 'web3-core-subscriptions'
import { BaseProvider, InfuraProvider, IpcProvider, JsonRpcProvider } from '@ethersproject/providers'
import { ApiClient } from '@cryptotentanz/api-client'
import { fetchBlockTransactions, fetchPendingTransaction, fetchTransactionReceipt } from './web3'
import { fetchTokenPrice } from './uniswap'

const logger = getLogger()

const ETH_IPC_FILE_PATH = 'geth/geth.ipc'
const RETRY_WAIT = 10 * 1000
const MAX_RETRIES = 10
const TRANSACTION_RECEIPTS_FETCHING_INTERVAL = 10 * 1000
const TOKEN_PRICE_FETCHING_INTERVAL = 30 * 1000

export interface EthereumData {
  apiClient: ApiClient
  web3: Web3
  web3Pool: Web3
  ethersProvider: BaseProvider
  contracts: Contract[]
  newBlocksSubscription: Subscription<BlockHeader> | null
  fetchingTransactionReceipts: boolean
  fetchingTokenPrices: boolean
  pendingTransactionsSubscription: Subscription<string> | null
}

type Providers = {
  web3: Web3
  ethersProvider?: BaseProvider
}

const logError = (message: string, error?: unknown): void => {
  logger.error(message)

  if (!error) return

  if ((error as Error).message) {
    logger.error((error as Error).message)
  }
  if ((error as Error).stack as string) {
    logger.error((error as Error).stack as string)
  }
}

const initializeProvider = (ipc: boolean, host?: string): Providers => {
  logger.info(`Provider (IPC: ${ipc}, host: '${host}')...`)

  if (ipc) {
    try {
      if (fs.existsSync(ETH_IPC_FILE_PATH)) {
        logger.info(`IPC file found at '${ETH_IPC_FILE_PATH}'.`)
        return {
          web3: new Web3(new Web3.providers.IpcProvider(ETH_IPC_FILE_PATH, require('net'))),
          ethersProvider: new IpcProvider(ETH_IPC_FILE_PATH),
        }
      } else {
        logger.info(`No IPC file at '${ETH_IPC_FILE_PATH}'.`)
      }
    } catch (error) {
      logError(`Error while looking for IPC file at '${ETH_IPC_FILE_PATH}'.`, error)
    }
  }

  if (!host) return { web3: new Web3() }

  const providerHost = host.toLowerCase()

  const ethersProvider = providerHost.includes('infura')
    ? new InfuraProvider(undefined, providerHost.split('/').pop())
    : new JsonRpcProvider(host)

  let web3: Web3

  if (providerHost.startsWith('http')) {
    logger.info(`HTTP provider: '${host}'.`)
    web3 = new Web3(new Web3.providers.HttpProvider(host))
  } else if (providerHost.startsWith('ws')) {
    logger.info(`Web Socket provider: '${host}'.`)
    web3 = new Web3(new Web3.providers.WebsocketProvider(host))
  } else {
    web3 = new Web3()
    logger.warn('No provider found.')
  }

  return {
    web3,
    ethersProvider,
  }
}

const initializeContracts = async (apiClient: ApiClient, web3: Web3): Promise<Contract[]> => {
  const contracts = (await fetchContracts(apiClient)).filter((contract) => contract.type == ContractType.Contract)
  contracts.push(...(await fetchTokens(apiClient)))

  contracts.forEach((contract) => {
    const { hash, abi } = contract
    contract.web3 = new web3.eth.Contract(JSON.parse(abi), hash)
  })

  logger.info(`${contracts.length} contracts initialized.`)
  return contracts
}

export const createEthereumData = async (apiClient: ApiClient): Promise<EthereumData> => {
  const { ETH_PROVIDER_IPC, ETH_PROVIDER, ETH_POOL_PROVIDER_IPC, ETH_POOL_PROVIDER } = process.env
  const { web3, ethersProvider } = initializeProvider(ETH_PROVIDER_IPC == '1', ETH_PROVIDER)
  const { web3: web3Pool } = initializeProvider(ETH_POOL_PROVIDER_IPC == '1', ETH_POOL_PROVIDER)
  const contracts = await initializeContracts(apiClient, web3)

  const data: EthereumData = {
    apiClient,
    web3,
    web3Pool,
    ethersProvider: ethersProvider as BaseProvider,
    contracts,
    newBlocksSubscription: null,
    fetchingTransactionReceipts: false,
    fetchingTokenPrices: false,
    pendingTransactionsSubscription: null,
  }

  return data
}

const tryFetchBlockTransactions = async (data: EthereumData, number: number): Promise<Transaction[] | null> => {
  return await tryAction(
    () => fetchBlockTransactions(data, number),
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => logError(`Error while fetching block #${number}.`, error),
    () => logger.info(`Block #${number} not available yet.`)
  )
}

const trySaveTransactions = async (data: EthereumData, transactions: Transaction[]): Promise<boolean> => {
  const result = await tryAction(
    async () => {
      await saveTransactions(data.apiClient, transactions)
      return true
    },
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => logError(`Error while saving ${transactions.length} transaction(s).`, error)
  )

  return !!result
}

const onNewBlock = async (data: EthereumData, blockHeader: BlockHeader): Promise<void> => {
  logger.info(`New block header received: #${blockHeader.number}.`)

  const transactions = await tryFetchBlockTransactions(data, blockHeader.number)

  if (!transactions) return

  const filteredTransactions = transactions.filter((transaction) => isTransactionWatched(transaction, data.contracts))

  if (!filteredTransactions.length) {
    logger.info(`No transaction to save from ${transactions.length} transactions in block #${blockHeader.number}.`)
    return
  }

  const result = await trySaveTransactions(data, filteredTransactions)

  if (result)
    logger.info(
      `${filteredTransactions.length}/${transactions.length} transaction(s) added from block #${blockHeader.number}.`
    )
}

export const subscribeToNewBlocks = (data: EthereumData): void => {
  if (data.newBlocksSubscription) return

  data.newBlocksSubscription = data.web3.eth
    .subscribe('newBlockHeaders')
    .on('connected', () => logger.info('Subscribed to new blocks.'))
    .on('data', (blockHeader) => onNewBlock(data, blockHeader))
    .on('error', (error) => logError('Error from new blocks subscription.', error))
}

export const unsubscribeFromNewBlocks = (data: EthereumData): void => {
  if (!data.newBlocksSubscription) return

  data.newBlocksSubscription.unsubscribe((error, result) => {
    if (!result) logError('Error while unsubscribing from new blocks.', error)

    logger.info('Unsubscribed from new blocks.')
    data.newBlocksSubscription = null
  })
}

const tryFetchTransactionsToUpdate = async (data: EthereumData): Promise<string[] | null> => {
  return await tryAction(
    () => fetchTransactionsToUpdate(data.apiClient),
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => logError('Error while fetching transactions to update.', error)
  )
}

const tryFetchTransactionReceipt = async (data: EthereumData, hash: string): Promise<Transaction | null> => {
  try {
    return await fetchTransactionReceipt(data, hash)
  } catch (error) {
    logError(`Error while fetching receipt for ${hash}.`, error)
    return null
  }
}

const fetchTransactionReceipts = async (data: EthereumData): Promise<void> => {
  if (!data.fetchingTransactionReceipts) return
  logger.info('Fetching transaction receipts...')

  const hashes = (await tryFetchTransactionsToUpdate(data)) || []
  logger.info(`${hashes.length} transaction(s) to update...`)

  const transactions = []
  if (hashes.length) {
    for (const hash of hashes) {
      if (!data.fetchingTransactionReceipts) return
      const transaction = await tryFetchTransactionReceipt(data, hash)

      if (transaction) {
        transactions.push(transaction)
      } else {
        logger.info(`Receipt not ready for transaction '${hash}'.`)
      }
    }

    if (transactions.length) {
      const updated = await trySaveTransactions(data, transactions)

      if (updated) logger.info(`${transactions.length} transaction(s) updated.`)
    } else {
      logger.info('No transaction to update.')
    }
  }

  if (!hashes.length || !transactions.length) {
    logger.debug(`Waiting ${TRANSACTION_RECEIPTS_FETCHING_INTERVAL / 1000} seconds...`)
    await sleep(TRANSACTION_RECEIPTS_FETCHING_INTERVAL)
  }

  fetchTransactionReceipts(data)
}

export const startFetchingTransactionReceipts = (data: EthereumData): void => {
  if (data.fetchingTransactionReceipts) return

  logger.info('Start fetching transaction receipts.')
  data.fetchingTransactionReceipts = true
  fetchTransactionReceipts(data)
}

export const stopFetchingTransactionReceipts = (data: EthereumData): void => {
  if (!data.fetchingTransactionReceipts) return

  data.fetchingTransactionReceipts = false
  logger.info('Stop fetching transaction receipts.')
}

const tryFetchTokenPrice = async (data: EthereumData, token: Token): Promise<boolean> => {
  try {
    await fetchTokenPrice(data, token)

    return true
  } catch (error) {
    logError(`Error while fetching price for ${token.label}.`, error)

    return false
  }
}

const tryUpdateTokenPrice = async (data: EthereumData, token: Token): Promise<boolean> => {
  try {
    await updateTokenPrice(data.apiClient, token)

    return true
  } catch (error) {
    logError(`Error while updating price for ${token.label}.`, error)

    return false
  }
}

const fetchTokenPrices = async (data: EthereumData): Promise<void> => {
  if (!data.fetchingTokenPrices) return

  const tokens = data.contracts.filter((contract) => contract.type == ContractType.Token && contract.hash != WETH_HASH)

  logger.info(`Fetching prices for ${tokens.length} tokens...`)

  for (const token of tokens) {
    if (!data.fetchingTokenPrices) return

    const result = await tryFetchTokenPrice(data, token as Token)

    if (result) await tryUpdateTokenPrice(data, token as Token)
  }

  logger.info(`Token prices fetched.`)
  logger.debug(`Waiting ${TOKEN_PRICE_FETCHING_INTERVAL / 1000} seconds...`)
  await sleep(TOKEN_PRICE_FETCHING_INTERVAL)

  fetchTokenPrices(data)
}

export const startFetchingTokenPrices = (data: EthereumData): void => {
  if (data.fetchingTokenPrices) return

  logger.info('Start fetching token prices.')
  data.fetchingTokenPrices = true
  fetchTokenPrices(data)
}

export const stopFetchingTokenPrices = (data: EthereumData): void => {
  if (!data.fetchingTokenPrices) return

  data.fetchingTokenPrices = false
  logger.info('Stop fetching token prices.')
}

const tryFetchTransaction = async (data: EthereumData, hash: string): Promise<Transaction | null> => {
  return await tryAction(
    () => fetchPendingTransaction(data, hash),
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => logError(`Error while fetching transaction ${hash}.`, error),
    () => logger.trace(`Transaction ${hash} not available yet.`)
  )
}

const trySaveTransaction = async (data: EthereumData, transaction: Transaction): Promise<boolean> => {
  const result = await tryAction(
    async () => {
      await saveTransaction(data.apiClient, transaction)

      return true
    },
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => logError(`Error while saving transaction ${transaction.hash}.`, error)
  )

  return !!result
}

const onNewPendingTransaction = async (data: EthereumData, hash: string): Promise<void> => {
  logger.trace(`New pending transaction received: ${hash}.`)

  const transaction = await tryFetchTransaction(data, hash)

  if (!transaction || !isTransactionWatched(transaction, data.contracts)) return

  const result = await trySaveTransaction(data, transaction)

  if (result) logger.info(`Pending transaction added: ${transaction.hash}.`)
}

export const subscribeToPendingTransactions = (data: EthereumData): void => {
  if (data.pendingTransactionsSubscription) return

  data.pendingTransactionsSubscription = data.web3Pool.eth
    .subscribe('pendingTransactions')
    .on('connected', () => logger.info('Subscribed to pending transactions.'))
    .on('data', (hash) => onNewPendingTransaction(data, hash))
    .on('error', (error) => logError('Error from pending transactions subscription.', error))
}

export const unsubscribeFromPendingTransactions = (data: EthereumData): void => {
  if (!data.pendingTransactionsSubscription) return

  data.pendingTransactionsSubscription.unsubscribe((error, result) => {
    if (!result) logError('Error while unsubscribing from pending transactions.', error)

    logger.info('Unsubscribed from pending transactions.')
    data.pendingTransactionsSubscription = null
  })
}
