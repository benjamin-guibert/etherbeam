# frozen_string_literal: true

user = User.new(
  user_type: :system,
  name: 'Ethereum Server',
  email: 'eth-server@etherbeam.com',
  password: 'eth-server'
)
user.skip_confirmation!
user.save

user = User.create!(
  user_type: :administrator,
  name: 'Administrator',
  email: 'admin@etherbeam.com',
  password: 'administrator'
)
user.skip_confirmation!
user.save

user = User.create!(
  user_type: :user,
  name: 'Henry Case',
  email: 'hcase@etherbeam.com',
  password: 'hcasehcase',
  password_confirmation: 'hcasehcase'
)
user.skip_confirmation!
user.save

Token.create!(
  address_hash: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  label: 'Uniswap (UNI)',
  abi: JSON.dump(JSON.parse(File.read('db/seeds/abis/uni.json'))),
  name: 'Uniswap',
  symbol: 'UNI',
  decimals: 18,
  chart_pair: 'UNIWETH',
  website: 'https://uniswap.org/',
  twitter: 'https://twitter.com/UniswapProtocol',
  discord: 'https://discord.com/invite/XErMcTq'
)
