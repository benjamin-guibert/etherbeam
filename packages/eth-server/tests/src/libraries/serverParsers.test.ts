import { parseContractData, parseTokenData, parseTransactionToData } from 'libraries/serverParsers'
import { TransactionData } from 'libraries/severTypes'
import { Contract, ContractType, LogType, Token, TransactionStatus } from 'libraries/types'
import Web3 from 'web3'
import { createTransaction } from '../../fixtures/libraries/ethereum'
import { createContractData, createTokenData } from '../../fixtures/libraries/server'

describe('Parse contract data', () => {
  let result: Contract

  beforeAll(() => {
    const contractData = createContractData()

    result = parseContractData(contractData)
  })

  it('should parse', () =>
    expect(result).toMatchObject({
      sanitizedHash: '0x0a00000000000000000000000000000000000111',
      hash: '0x0A00000000000000000000000000000000000111',
      type: ContractType.Contract,
      label: 'Contract',
      abi: '[]',
    }))
})

describe('Parse token data', () => {
  let result: Token

  beforeAll(() => {
    const tokenData = createTokenData()

    result = parseTokenData(tokenData)
  })

  it('should parse', () =>
    expect(result).toMatchObject({
      sanitizedHash: '0x0a00000000000000000000000000000000000111',
      hash: '0x0A00000000000000000000000000000000000111',
      type: ContractType.Token,
      label: 'Token (TKN)',
      abi: '[]',
      decimals: 18,
      price: '1000',
    }))
})

describe('Parse transaction to data', () => {
  let result: TransactionData

  beforeAll(() => {
    const transaction = {
      ...createTransaction(),
      status: TransactionStatus.validated,
      dateTime: new Date(2020, 4, 5, 11, 22, 33),
      blockNumber: 1000,
      from: '0x0000000000000000000000000000000000000111',
      to: '0x0000000000000000000000000000000000000222',
      gasUnitPrice: Web3.utils.toBN('500'),
      gasLimit: 10000,
      gasUsed: 9000,
      action: {
        hash: '0x0000000000000000000000000000000000000111',
        name: 'function1',
        parameters: [
          {
            index: 0,
            name: 'input1',
            type: 'address[]',
            value: ['0x0000000000000000000000000000000000000111'],
          },
        ],
      },
      logs: [
        {
          hash: '0x0000000000000000000000000000000000000222',
          index: 0,
          name: 'event1',
          parameters: [
            {
              index: 0,
              name: 'input1',
              type: 'uint256',
              value: '1000',
            },
          ],
        },
      ],
      systemLogs: [{ type: LogType.Error, message: 'Error.' }],
    }

    result = parseTransactionToData(transaction)
  })

  it('should parse', () =>
    expect(result).toMatchObject({
      transaction_hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
      status: TransactionStatus.validated,
      datetime: new Date(2020, 4, 5, 11, 22, 33),
      block_number: 1000,
      from_address_hash: '0x0000000000000000000000000000000000000111',
      to_address_hash: '0x0000000000000000000000000000000000000222',
      value: '1000000000000000000',
      gas_unit_price: '500',
      gas_limit: 10000,
      gas_used: 9000,
      transaction_method_action_attributes: {
        contract_hash: '0x0000000000000000000000000000000000000111',
        name: 'function1',
        parameters_attributes: [
          {
            index: 0,
            name: 'input1',
            raw_type: 'address[]',
            raw_value: '["0x0000000000000000000000000000000000000111"]',
            decimal_value: null,
            addresses_attributes: [
              {
                index: 0,
                address_hash: '0x0000000000000000000000000000000000000111',
              },
            ],
          },
        ],
      },
      transaction_method_logs_attributes: [
        {
          index: 0,
          contract_hash: '0x0000000000000000000000000000000000000222',
          name: 'event1',
          parameters_attributes: [
            {
              index: 0,
              name: 'input1',
              raw_type: 'uint256',
              raw_value: '1000',
              decimal_value: '1000',
              addresses_attributes: null,
            },
          ],
        },
      ],
      logs_attributes: [{ log_type: LogType.Error, message: 'Error.' }],
    }))
})
