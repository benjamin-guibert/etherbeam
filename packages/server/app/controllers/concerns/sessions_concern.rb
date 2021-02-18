# frozen_string_literal: true

module SessionsConcern
  def authenticate_eth_server!
    return head :unauthorized unless user_signed_in? && current_user.user_type == 'eth_server'

    yield
  end
end
