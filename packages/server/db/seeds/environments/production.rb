# frozen_string_literal: true

user = User.new(
  user_type: :eth_server,
  name: 'Ethereum Server',
  email: 'eth-server@etherbeam.com',
  password: ENV['ETH_SERVER_USER_PASSWORD']
)
user.skip_confirmation!
user.save
