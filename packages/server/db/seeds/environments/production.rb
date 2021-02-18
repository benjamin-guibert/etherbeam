# frozen_string_literal: true

user = User.new(
  user_type: :eth_server,
  name: 'Ethereum Server',
  email: 'eth-server@etherbeam.com',
  password: Rails.application.credentials[:eth_server_user_password]
)
user.skip_confirmation!
user.save
