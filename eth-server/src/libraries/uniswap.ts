import { getLogger } from './logger'
import { ChainId, Fetcher, Route, Token as UniswapToken, WETH } from '@uniswap/sdk'
import { EthereumData } from './ethereum'
import { Token, WETH_DECIMALS } from './types'

const logger = getLogger()

export const fetchTokenPrice = async ({ ethersProvider }: EthereumData, token: Token): Promise<void> => {
  const { hash, label, decimals } = token
  logger.debug(`Fetching price for ${label}...`)

  const uniswapToken = new UniswapToken(ChainId.MAINNET, hash, decimals)
  const pair = await Fetcher.fetchPairData(uniswapToken, WETH[uniswapToken.chainId], ethersProvider)
  const route = new Route([pair], WETH[uniswapToken.chainId])
  const price = route.midPrice.invert().toSignificant(WETH_DECIMALS)

  token.price = price
    .slice(0, price.indexOf('.') + 1 + WETH_DECIMALS)
    .replace('.', '')
    .replace(/^0+/, '')

  logger.debug(`New price for ${label}: ${token.price} Wei.`)
}
