import { config } from 'dotenv'
import { forever } from 'async'

config()

import { getLogger } from './libraries/logger'
import { initializeApiClient, signIn, signOut } from './libraries/server'
import {
  subscribeToNewBlocks,
  unsubscribeFromNewBlocks,
  stopFetchingTransactionReceipts,
  startFetchingTransactionReceipts,
  stopFetchingTokenPrices,
  startFetchingTokenPrices,
  createEthereumData,
} from './libraries/ethereum'
import { AxiosError } from 'axios'

const logger = getLogger()

const {
  NODE_ENV,
  SERVER_API_HOST,
  SERVER_API_USER,
  SERVER_API_PASSWORD,
  ETH_PROVIDER_IPC,
  ETH_PROVIDER,
  ETH_POOL_PROVIDER_IPC,
  ETH_POOL_PROVIDER,
} = process.env
logger.info('===== Ethereum Server: STARTING... =====')
logger.info(`Environment: ${NODE_ENV}`)
logger.info(`Server API host: ${SERVER_API_HOST}`)
logger.info(`Server API user: ${SERVER_API_USER}`)
logger.info(`Server API password: ${!!SERVER_API_PASSWORD}`)
logger.info(`ETH provider IPC: ${ETH_PROVIDER_IPC}`)
logger.info(`ETH provider: ${ETH_PROVIDER}`)
logger.info(`ETH pool provider IPC: ${!!ETH_POOL_PROVIDER_IPC}`)
logger.info(`ETH pool Provider: ${ETH_POOL_PROVIDER}`)

const displayFatalError = (error?: AxiosError | Error | null): void => {
  logger.error('A fatal error occured:')
  logger.error((error as Error)?.message)
  logger.error((error as Error)?.stack as string)

  const response = (error as AxiosError).response
  if (response) {
    logger.error(response.data)
  }
  logger.info('===== Ethereum Server: DOWN =====')

  process.exit(1)
}

const apiClient = initializeApiClient()

signIn(apiClient)
  .then(() => {
    createEthereumData(apiClient)
      .then((data) => {
        forever(
          () => {
            subscribeToNewBlocks(data)
            startFetchingTokenPrices(data)
            startFetchingTransactionReceipts(data)

            logger.info('===== Ethereum Server: UP =====')
          },
          (error?: Error | null) => {
            unsubscribeFromNewBlocks(data)
            stopFetchingTransactionReceipts(data)
            stopFetchingTokenPrices(data)
            signOut(apiClient)

            displayFatalError(error)
          }
        )
      })
      .catch((error) => {
        signOut(apiClient)

        displayFatalError(error)
      })
  })
  .catch(displayFatalError)
