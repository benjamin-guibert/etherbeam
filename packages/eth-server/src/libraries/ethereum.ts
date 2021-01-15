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
import { fetchBlockTransactions, fetchPendingTransaction, fetchTransactionReceipt } from './web3'
import { BaseProvider, InfuraProvider, IpcProvider, JsonRpcProvider } from '@ethersproject/providers'
import { fetchTokenPrice } from './uniswap'

const logger = getLogger()

const ETH_IPC_FILE_PATH = 'geth/geth.ipc'
const RETRY_WAIT = 10 * 1000
const MAX_RETRIES = 10
const TRANSACTION_RECEIPTS_FETCHING_INTERVAL = 10 * 1000
const TOKEN_PRICE_FETCHING_INTERVAL = 30 * 1000

export interface EthereumData {
  web3: Web3
  web3Pool: Web3
  ethersProvider: BaseProvider
  contracts: Contract[]
  newBlocksSubscription: Subscription<BlockHeader>
  fetchingTransactionReceipts: boolean
  fetchingTokenPrices: boolean
  pendingTransactionsSubscription: Subscription<string>
}

const initializeProvider = (ipc: boolean, host: string): { web3: Web3; ethers: BaseProvider } => {
  logger.info(`Provider (IPC: ${ipc}, host: '${host}')...`)

  if (ipc) {
    try {
      if (fs.existsSync(ETH_IPC_FILE_PATH)) {
        logger.info(`IPC file found at '${ETH_IPC_FILE_PATH}'.`)
        return {
          web3: new Web3(new Web3.providers.IpcProvider(ETH_IPC_FILE_PATH, require('net'))),
          ethers: new IpcProvider(ETH_IPC_FILE_PATH),
        }
      } else {
        logger.info(`No IPC file at '${ETH_IPC_FILE_PATH}'.`)
      }
    } catch (error) {
      logger.error(`Error while looking for IPC file at '${ETH_IPC_FILE_PATH}'.`)
      logger.error(error.message)
      logger.error(error.stack)
    }
  }

  const providerHost = host?.toLowerCase()

  if (!providerHost) {
    logger.warn('Provider host is missing.')
    return {
      web3: new Web3(),
      ethers: null,
    }
  }

  const providers = { web3: null, ethers: null }

  if (providerHost.includes('infura')) {
    providers.ethers = new InfuraProvider(null, providerHost.split('/').pop())
  } else {
    providers.ethers = new JsonRpcProvider(host)
  }

  if (providerHost.startsWith('http')) {
    logger.info(`HTTP provider: '${host}'.`)
    providers.web3 = new Web3(new Web3.providers.HttpProvider(host))
  } else if (providerHost.startsWith('ws')) {
    logger.info(`Web Socket provider: '${host}'.`)
    providers.web3 = new Web3(new Web3.providers.WebsocketProvider(host))
  } else {
    providers.web3 = new Web3()
    logger.warn('No provider found.')
  }

  return providers
}

const initializeProviders = (data: EthereumData): void => {
  const { ETH_PROVIDER_IPC, ETH_PROVIDER, ETH_POOL_PROVIDER_IPC, ETH_POOL_PROVIDER } = process.env
  logger.info('Initializing base provider...')
  const { web3, ethers } = initializeProvider(ETH_PROVIDER_IPC == '1', ETH_PROVIDER)
  data.web3 = web3
  data.ethersProvider = ethers
  logger.info('Initializing pool provider...')
  data.web3Pool = initializeProvider(ETH_POOL_PROVIDER_IPC == '1', ETH_POOL_PROVIDER).web3
}

const initializeContracts = async (data: EthereumData): Promise<void> => {
  data.contracts = (await fetchContracts()).filter((contract) => contract.type == ContractType.Contract)
  data.contracts.push(...(await fetchTokens()))

  data.contracts.forEach((contract) => {
    const { hash, abi } = contract
    contract.web3 = new data.web3.eth.Contract(JSON.parse(abi), hash)
  })

  logger.info(`${data.contracts.length} contracts initialized.`)
}

export const useEthereum = async (): Promise<EthereumData> => {
  const data = {
    web3: undefined,
    web3Pool: undefined,
    ethersProvider: undefined,
    contracts: undefined,
    newBlocksSubscription: null,
    fetchingTransactionReceipts: false,
    fetchingTokenPrices: false,
    pendingTransactionsSubscription: null,
  }

  initializeProviders(data)
  await initializeContracts(data)

  return data
}

const tryFetchBlockTransactions = async (number: number, data: EthereumData): Promise<Transaction[]> => {
  return await tryAction<Transaction[]>(
    () => fetchBlockTransactions(number, data),
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => {
      logger.error(`Error while fetching block #${number}.`)
      logger.error(error.message)
      logger.error(error.stack)
    },
    () => logger.info(`Block #${number} not available yet.`)
  )
}

const trySaveTransactions = async (transactions: Transaction[]): Promise<boolean> => {
  const result = await tryAction<boolean>(
    async () => {
      await saveTransactions(transactions)
      return true
    },
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => {
      logger.error(`Error while saving ${transactions.length} transaction(s).`)
      logger.error(error.message)
      logger.error(error.stack)
    }
  )

  return !!result
}

const onNewBlock = async (blockHeader: BlockHeader, data: EthereumData): Promise<void> => {
  logger.debug(`New block header received: #${blockHeader.number}.`)

  const transactions = await tryFetchBlockTransactions(blockHeader.number, data)

  if (!transactions) return

  const filteredTransactions = transactions.filter((transaction) => isTransactionWatched(transaction, data.contracts))

  if (!filteredTransactions.length) return

  const result = await trySaveTransactions(filteredTransactions)

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
    .on('data', (blockHeader) => onNewBlock(blockHeader, data))
    .on('error', (error) => {
      logger.error('Error from new blocks subscription.')
      logger.error(error.message)
      logger.error(error.stack)
    })
}

export const unsubscribeFromNewBlocks = (data: EthereumData): void => {
  if (!data.newBlocksSubscription) return

  data.newBlocksSubscription.unsubscribe((error, result) => {
    if (!result) {
      logger.error('Error while unsubscribing from new blocks.')
      logger.error(error?.message)
      logger.error(error?.stack)
    }

    logger.info('Unsubscribed from new blocks.')
    data.newBlocksSubscription = null
  })
}

const tryFetchTransactionsToUpdate = async (): Promise<string[]> => {
  return await tryAction<string[]>(fetchTransactionsToUpdate, RETRY_WAIT, MAX_RETRIES, (error) => {
    logger.error('Error while fetching transactions to update.')
    logger.error(error.message)
    logger.error(error.stack)
  })
}

const tryFetchTransactionReceipt = async (hash: string, data: EthereumData): Promise<Transaction> => {
  try {
    return await fetchTransactionReceipt(hash, data)
  } catch (error) {
    logger.error(`Error while fetching receipt for '${hash}'.`)
    logger.error(error.message)
    logger.error(error.stack)
    return null
  }
}

const fetchTransactionReceipts = async (data: EthereumData): Promise<void> => {
  if (!data.fetchingTransactionReceipts) return
  logger.info('Fetching transaction receipts...')

  const hashes = await tryFetchTransactionsToUpdate()
  logger.info(`${hashes.length} transaction(s) to update...`)

  const transactions = []
  if (hashes.length) {
    for (const hash of hashes) {
      if (!data.fetchingTransactionReceipts) return
      const transaction = await tryFetchTransactionReceipt(hash, data)

      if (transaction) {
        transactions.push(transaction)
      } else {
        logger.info(`Receipt not ready for transaction '${hash}'.`)
      }
    }

    if (transactions.length) {
      const updated = await trySaveTransactions(transactions)

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

const tryFetchTokenPrice = async (token: Token, data: EthereumData): Promise<boolean> => {
  try {
    await fetchTokenPrice(token, data)

    return true
  } catch (error) {
    logger.error(`Error while fetching price for ${token.label}.`)
    logger.error(error.message)
    logger.error(error.stack)

    return false
  }
}

const tryUpdateTokenPrice = async (token: Token): Promise<boolean> => {
  try {
    await updateTokenPrice(token)

    return true
  } catch (error) {
    logger.error(`Error while updating price for ${token.label}.`)
    logger.error(error.message)
    logger.error(error.stack)

    return false
  }
}

const fetchTokenPrices = async (data: EthereumData): Promise<void> => {
  if (!data.fetchingTokenPrices) return

  const tokens = data.contracts.filter((contract) => contract.type == ContractType.Token && contract.hash != WETH_HASH)

  logger.info(`Fetching prices for ${tokens.length} tokens...`)

  for (const token of tokens) {
    if (!data.fetchingTokenPrices) return

    const result = await tryFetchTokenPrice(token as Token, data)

    if (result) await tryUpdateTokenPrice(token as Token)
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

const tryFetchTransaction = async (hash: string, data: EthereumData): Promise<Transaction> => {
  return await tryAction<Transaction>(
    () => fetchPendingTransaction(hash, data),
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => {
      logger.error(`Error while fetching transaction ${hash}.`)
      logger.error(error.message)
      logger.error(error.stack)
    },
    () => logger.trace(`Transaction ${hash} not available yet.`)
  )
}

const trySaveTransaction = async (transaction: Transaction): Promise<boolean> => {
  const result = await tryAction<boolean>(
    async () => {
      await saveTransaction(transaction)

      return true
    },
    RETRY_WAIT,
    MAX_RETRIES,
    (error) => {
      logger.error(`Error while saving transaction ${transaction.hash}.`)
      logger.error(error.message)
      logger.error(error.stack)
    }
  )

  return !!result
}

const onNewPendingTransaction = async (hash: string, data: EthereumData): Promise<void> => {
  logger.trace(`New pending transaction received: ${hash}.`)

  const transaction = await tryFetchTransaction(hash, data)

  if (!transaction || !isTransactionWatched(transaction, data.contracts)) return

  const result = await trySaveTransaction(transaction)

  if (result) logger.info(`Pending transaction added: ${transaction.hash}.`)
}

export const subscribeToPendingTransactions = (data: EthereumData): void => {
  if (data.pendingTransactionsSubscription) return

  data.pendingTransactionsSubscription = data.web3Pool.eth
    .subscribe('pendingTransactions')
    .on('connected', () => logger.info('Subscribed to pending transactions.'))
    .on('data', (hash) => onNewPendingTransaction(hash, data))
    .on('error', (error) => {
      logger.error('Error from pending transactions subscription.')
      logger.error(error?.message)
      logger.error(error?.stack)
    })
}

export const unsubscribeFromPendingTransactions = (data: EthereumData): void => {
  if (!data.pendingTransactionsSubscription) return

  data.pendingTransactionsSubscription.unsubscribe((error, result) => {
    if (!result) {
      logger.error('Error while unsubscribing from pending transactions.')
      logger.error(error?.message)
      logger.error(error?.stack)
    }

    logger.info('Unsubscribed from pending transactions.')
    data.pendingTransactionsSubscription = null
  })
}
