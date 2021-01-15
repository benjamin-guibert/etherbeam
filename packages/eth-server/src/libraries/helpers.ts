import { Contract, ContractType, Transaction, USDC_HASH, WETH_HASH } from './types'
import uniq from 'lodash/uniq'

export const sleep = (milliseconds: number, callback?: () => void): Promise<void> => {
  return new Promise((resolve) => setTimeout(callback || resolve, milliseconds))
}

export const tryAction = async <T>(
  action: () => Promise<T>,
  waitingTime: number,
  maxRetries: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any, count: number) => boolean | void,
  onNull?: (count: number) => boolean | void
): Promise<T> => {
  let result = undefined
  let count = 0

  while (!result) {
    try {
      result = await action()

      if (result == null) {
        count++
        if (onNull?.(count) || count > maxRetries) return null

        await sleep(waitingTime)
      }
    } catch (error) {
      count++
      if (onError?.(error, count) || count > maxRetries) return null

      await sleep(waitingTime)
    }
  }

  return result
}

export const sanitizeHash = (value: string): string => {
  if (!value) return value

  return `${value.substr(0, 2)}${value.substr(2).toLowerCase()}`
}

export const getAddressHashesFromTransaction = ({ from, to, action }: Transaction): string[] => {
  const hashes = [sanitizeHash(from), sanitizeHash(to)]
  action?.parameters.forEach((parameter) => {
    switch (parameter.type) {
      case 'address':
        hashes.push(sanitizeHash(parameter.value as string))
        break
      case 'address[]':
        ;(parameter.value as string[]).forEach((value) => hashes.push(sanitizeHash(value)))
        break
    }
  })

  return uniq(hashes)
}

export const isTransactionWatched = (transaction: Transaction, contracts: Contract[]): boolean => {
  const ignoredHashes = [WETH_HASH, USDC_HASH]
  const tokenHashes = contracts
    .filter((contract) => contract.type == ContractType.Token && !ignoredHashes.includes(contract.hash))
    .map((token) => token.sanitizedHash)
  const transactionHashes = getAddressHashesFromTransaction(transaction)

  return transactionHashes.some((hash) => tokenHashes.includes(hash))
}
