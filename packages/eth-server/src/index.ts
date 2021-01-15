import { config } from 'dotenv'
import forever from 'async/forever'

config()

import { getLogger } from './libraries/logger'
import {
  useEthereum,
  subscribeToNewBlocks,
  unsubscribeFromNewBlocks,
  stopFetchingTransactionReceipts,
  startFetchingTransactionReceipts,
  stopFetchingTokenPrices,
  startFetchingTokenPrices,
  // subscribeToPendingTransactions,
  unsubscribeFromPendingTransactions,
} from './libraries/ethereum'

const logger = getLogger()

const {
  NODE_ENV,
  SERVER_API_HOST,
  ETH_PROVIDER_IPC,
  ETH_PROVIDER,
  ETH_POOL_PROVIDER_IPC,
  ETH_POOL_PROVIDER,
} = process.env
logger.info('===== Ethereum Server: STARTING... =====')
logger.info(`Environment: ${NODE_ENV}`)
logger.info(`Server API: ${SERVER_API_HOST}`)
logger.info(`ETH provider IPC: ${ETH_PROVIDER_IPC}`)
logger.info(`ETH provider: ${ETH_PROVIDER}`)
logger.info(`ETH pool provider IPC: ${!!ETH_POOL_PROVIDER_IPC}`)
logger.info(`ETH pool Provider: ${ETH_POOL_PROVIDER}`)

try {
  useEthereum().then((data) => {
    forever(
      () => {
        subscribeToNewBlocks(data)
        //subscribeToPendingTransactions(data)
        startFetchingTokenPrices(data)
        startFetchingTransactionReceipts(data)

        logger.info('===== Ethereum Server: UP =====')
      },
      (error: Error) => {
        unsubscribeFromPendingTransactions(data)
        unsubscribeFromNewBlocks(data)
        stopFetchingTransactionReceipts(data)
        stopFetchingTokenPrices(data)

        throw error
      }
    )
  })
} catch (error) {
  logger.error('An unhandled error occured.')
  logger.error(error)
  logger.info('===== Ethereum Server: DOWN =====')
}
