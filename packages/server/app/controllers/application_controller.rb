# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  # before_action :authenticate_user!

  after_action { pagy_headers_merge(@pagy) if @pagy }

  def first_last_headers(first, last)
    response.headers['First-Item'] = first.to_s
    response.headers['Last-Item'] = last.to_s
  end
end
