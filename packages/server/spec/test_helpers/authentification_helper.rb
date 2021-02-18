# frozen_string_literal: true

require 'rails_helper'

module Helpers
  module AuthentificationHelper
    def user_auth_headers(user_type)
      user = create :user, user_type: user_type
      params = {
        email: user.email,
        password: 'password'
      }

      post '/auth/login', params: params

      auth_headers_from_login_response(response)
    end

    def auth_headers_from_login_response(response)
      client = response.headers['client']
      token = response.headers['access-token']
      expiry = response.headers['expiry']
      token_type = response.headers['token-type']
      uid = response.headers['uid']

      {
        'access-token' => token,
        'client' => client,
        'uid' => uid,
        'expiry' => expiry,
        'token-type' => token_type
      }
    end
  end
end
