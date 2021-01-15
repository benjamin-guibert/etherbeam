# frozen_string_literal: true

Token.create!(
  address_hash: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  label: 'Uniswap (UNI)',
  abi: JSON.dump(JSON.parse(File.read('db/seeds/abis/uni.json'))),
  name: 'Uniswap',
  symbol: 'UNI',
  decimals: 18,
  website: 'https://uniswap.org/',
  twitter: 'https://twitter.com/UniswapProtocol',
  discord: 'https://discord.com/invite/XErMcTq'
)
