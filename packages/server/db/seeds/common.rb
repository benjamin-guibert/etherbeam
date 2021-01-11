# frozen_string_literal: true

Token.create!(
  address_hash: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  address_type: :token,
  label: 'Wrapped Ether (WETH)',
  abi: JSON.dump(JSON.parse(File.read('db/seeds/abis/weth.json'))),
  name: 'Wrapped Ether',
  symbol: 'WETH',
  decimals: 18,
  website: 'https://weth.io/',
  twitter: 'https://twitter.com/radarrelay',
  telegram: 'https://t.me/radar_relay'
)

Contract.create!(
  address_hash: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  address_type: :contract,
  label: 'Uniswap V2: Router 2',
  abi: JSON.dump(JSON.parse(File.read('db/seeds/abis/uniswap_router_2.json')))
)
