# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  after_action { pagy_headers_merge(@pagy) if @pagy }

  def authenticate_eth_server!
    return render_authenticate_error unless user_signed_in? && current_user.user_type == 'eth_server'
  end

  def authenticate_administrator!
    return render_authenticate_error unless user_signed_in? && current_user.user_type == 'administrator'
  end
end
