import { AxiosInstance } from 'axios'
import { sanitizeHash } from 'libraries/helpers'
import { ServerData } from 'libraries/server'
import { ContractData, TokenData, TransactionData } from 'libraries/severTypes'
import { ContractType, TransactionStatus } from 'libraries/types'

export const createServerData = (): ServerData => {
  return {
    axiosClient: ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      defaults: {
        headers: {},
      },
    } as unknown) as AxiosInstance,
    authToken: null,
  }
}

export const createContractData = (hash = '0x0A00000000000000000000000000000000000111'): ContractData => {
  return {
    sanitized_hash: sanitizeHash(hash),
    address_hash: hash,
    address_type: ContractType.Contract,
    label: 'Contract',
    abi: '[]',
  }
}

export const createTokenData = (hash = '0x0A00000000000000000000000000000000000111'): TokenData => {
  return {
    sanitized_hash: sanitizeHash(hash),
    address_hash: hash,
    address_type: ContractType.Token,
    label: 'Token (TKN)',
    abi: '[]',
    decimals: 18,
    price: '1000',
  }
}

export const createTransactionData = (
  hash = '0x0000000000000000000000000000000000000000000000000000000000000001'
): TransactionData => {
  return {
    transaction_hash: hash,
    status: TransactionStatus.pending,
    logs_attributes: [],
  }
}
