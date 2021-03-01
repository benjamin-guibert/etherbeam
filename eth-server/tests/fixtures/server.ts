import { AxiosInstance } from 'axios'
import { ApiClient } from '@cryptotentanz/api-client'
import { sanitizeHash } from '../../src/libraries/helpers'
import { ContractData, TokenData, TransactionData } from '../../src/libraries/severTypes'
import { ContractType, TransactionStatus } from '../../src/libraries/types'

export const createApiClient = (): ApiClient => {
  return {
    axiosInstance: ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: {
        headers: undefined,
      },
    } as unknown) as AxiosInstance,
    authTokenLifecycle: { newTokenSubscriptions: [] },
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
