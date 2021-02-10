import { BigNumber } from 'ethers'
import {
  AddressType,
  HistoryTime,
  Token,
  Transaction,
  TransactionMethodParameterType,
  TransactionStatus,
} from './types'
import { parseTransactionData, parseTokenData } from './serverParsers'

describe('Parse transaction data', () => {
  const data = {
    transaction_hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
    status: TransactionStatus.Validated,
    datetime: new Date(2020, 4, 5, 11, 22, 33),
    block_number: 1000,
    from_address_hash: '0x0000000000000000000000000000000000000111',
    from_address: {
      address_hash: '0x0000000000000000000000000000000000000111',
      address_type: AddressType.Wallet,
      label: 'My Wallet',
    },
    to_address_hash: '0x0000000000000000000000000000000000000222',
    value: '100000000000000000000.0',
    gas_unit_price: '100.0',
    gas_limit: 10000,
    gas_used: 5000,
    gas_ratio: 0.5,
    gas_fee: '500000.0',
    transaction_method_action: {
      contract: {
        address_hash: '0x0000000000000000000000000000000000000222',
        address_type: AddressType.Contract,
        label: 'Contract',
      },
      name: 'action',
      parameters: [
        {
          name: 'paramUnknown',
          raw_type: 'unknown',
          parameter_type: TransactionMethodParameterType.Unknown,
        },
        {
          name: 'paramUint',
          raw_type: 'uint256',
          parameter_type: TransactionMethodParameterType.UnsignedInteger,
          decimal_value: '100000000000000000000',
        },
        {
          name: 'paramAddress',
          raw_type: 'address',
          parameter_type: TransactionMethodParameterType.Address,
          addresses: [
            {
              address_hash: '0x0000000000000000000000000000000000000111',
              address: {
                address_hash: '0x0000000000000000000000000000000000000111',
                address_type: AddressType.Wallet,
                label: 'My Wallet',
              },
            },
          ],
        },
        {
          name: 'paramAddresses',
          raw_type: 'address[]',
          parameter_type: TransactionMethodParameterType.Addresses,
          addresses: [
            {
              address_hash: '0x0000000000000000000000000000000000000111',
              address: {
                address_hash: '0x0000000000000000000000000000000000000111',
                address_type: AddressType.Wallet,
                label: 'My Wallet',
              },
            },
            { address_hash: '0x0000000000000000000000000000000000000112' },
            {
              address_hash: '0x0000000000000000000000000000000000000111',
              address: {
                address_hash: '0x0000000000000000000000000000000000000111',
                address_type: AddressType.Wallet,
                label: 'My Wallet',
              },
            },
          ],
        },
      ],
    },
    transaction_method_logs: [
      {
        contract: {
          address_hash: '0x0000000000000000000000000000000000000222',
          address_type: AddressType.Token,
          label: 'Token (TKN)',
        },
        name: 'event',
        parameters: [
          {
            name: 'paramAddress',
            raw_type: 'address',
            parameter_type: TransactionMethodParameterType.Address,
            addresses: [
              {
                address_hash: '0x0000000000000000000000000000000000000111',
                address: {
                  address_hash: '0x0000000000000000000000000000000000000111',
                  address_type: AddressType.Wallet,
                  label: 'My Wallet',
                },
              },
            ],
          },
        ],
      },
    ],
  }

  let result: Transaction

  beforeAll(() => {
    result = parseTransactionData(data)
  })

  it('should return', () => {
    expect(result).toMatchObject({
      address: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
        type: AddressType.Transaction,
        url: 'https://etherscan.io/tx/0x0000000000000000000000000000000000000000000000000000000000000001',
      },
      status: TransactionStatus.Validated,
      dateTime: new Date(2020, 4, 5, 11, 22, 33),
      blockNumber: 1000,
      from: {
        hash: '0x0000000000000000000000000000000000000111',
        type: AddressType.Wallet,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
        label: 'My Wallet',
      },
      to: {
        hash: '0x0000000000000000000000000000000000000222',
        type: AddressType.Unknown,
        url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
      },
      value: BigNumber.from('100000000000000000000'),
      gas: {
        unitPrice: BigNumber.from('100'),
        limit: 10000,
        used: 5000,
        ratio: 0.5,
        price: BigNumber.from('500000'),
      },
      action: {
        name: 'action',
        parameters: [
          {
            name: 'paramUnknown',
            rawType: 'unknown',
            type: TransactionMethodParameterType.Unknown,
            value: null,
          },
          {
            name: 'paramUint',
            rawType: 'uint256',
            type: TransactionMethodParameterType.UnsignedInteger,
            value: BigNumber.from('100000000000000000000'),
          },
          {
            name: 'paramAddress',
            rawType: 'address',
            type: TransactionMethodParameterType.Address,
            value: {
              hash: '0x0000000000000000000000000000000000000111',
              type: AddressType.Wallet,
              url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
              label: 'My Wallet',
            },
          },
          {
            name: 'paramAddresses',
            rawType: 'address[]',
            type: TransactionMethodParameterType.Addresses,
            value: [
              {
                hash: '0x0000000000000000000000000000000000000111',
                type: AddressType.Wallet,
                url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
                label: 'My Wallet',
              },
              {
                hash: '0x0000000000000000000000000000000000000112',
                type: AddressType.Unknown,
                url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000112',
              },
              {
                hash: '0x0000000000000000000000000000000000000111',
                type: AddressType.Wallet,
                url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
                label: 'My Wallet',
              },
            ],
          },
        ],
      },
      logs: [
        {
          contract: {
            hash: '0x0000000000000000000000000000000000000222',
            type: AddressType.Token,
            url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000222',
            label: 'Token (TKN)',
          },
          name: 'event',
          parameters: [
            {
              name: 'paramAddress',
              rawType: 'address',
              type: TransactionMethodParameterType.Address,
              value: {
                hash: '0x0000000000000000000000000000000000000111',
                type: AddressType.Wallet,
                url: 'https://etherscan.io/address/0x0000000000000000000000000000000000000111',
                label: 'My Wallet',
              },
            },
          ],
        },
      ],
    })
  })
})

describe('Parse token data', () => {
  const data = {
    address_hash: '0x0000000000000000000000000000000000000111',
    address_type: AddressType.Token,
    label: 'Token (TKN)',
    name: 'Token',
    description: 'Token description.',
    symbol: 'TKN',
    decimals: 18,
    chart_pair: 'TKNWETH',
    price: '2000',
    price_1h: '1000',
    price_1h_ratio: 2.0,
    price_1d: '4000',
    price_1d_ratio: 0.5,
    price_1w: '8000',
    price_1w_ratio: 0.25,
    price_1m: '2000',
    price_1m_ratio: 1.0,
    price_1y: '500',
    price_1y_ratio: 4.0,
    website: 'website',
    whitepaper: 'whitepaper',
    github: 'github',
    linkedin: 'linkedin',
    facebook: 'facebook',
    reddit: 'reddit',
    twitter: 'twitter',
    telegram: 'telegram',
    discord: 'discord',
  }

  let result: Token

  beforeAll(() => {
    result = parseTokenData(data)
  })

  it('should return', () => {
    expect(result).toMatchObject({
      hash: '0x0000000000000000000000000000000000000111',
      type: AddressType.Token,
      url: 'https://etherscan.io/token/0x0000000000000000000000000000000000000111',
      label: 'Token (TKN)',
      name: 'Token',
      description: 'Token description.',
      symbol: 'TKN',
      decimals: 18,
      chartPair: 'TKNWETH',
      price: BigNumber.from('2000'),
      priceHistory: [
        { time: HistoryTime.Hour, price: BigNumber.from('1000'), ratio: 2.0 },
        { time: HistoryTime.Day, price: BigNumber.from('4000'), ratio: 0.5 },
        { time: HistoryTime.Week, price: BigNumber.from('8000'), ratio: 0.25 },
        { time: HistoryTime.Month, price: BigNumber.from('2000'), ratio: 1.0 },
        { time: HistoryTime.Year, price: BigNumber.from('500'), ratio: 4.0 },
      ],
      website: 'website',
      whitepaper: 'whitepaper',
      github: 'github',
      linkedin: 'linkedin',
      facebook: 'facebook',
      reddit: 'reddit',
      twitter: 'twitter',
      telegram: 'telegram',
      discord: 'discord',
    })
  })
})
