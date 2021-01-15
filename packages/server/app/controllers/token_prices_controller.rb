# frozen_string_literal: true

class TokenPricesController < ApplicationController
  include HashHelper

  def save
    @token = Token.find_by_sanitized_hash sanitize_hash params[:address]

    return head :not_found unless @token

    @token_price = @token.prices.last

    if token_price_params[:price]&.to_d == @token_price&.price
      update_token_price
    else
      create_token_price
    end
  end

  private

  def token_price_params
    params.require(:token_price).permit(:datetime, :price)
  end

  def create_token_price
    create_params = token_price_params
    create_params[:token_id] = @token.id
    TokenPrice.create! create_params

    head :created
  end

  def update_token_price
    @token_price.update! datetime: token_price_params[:datetime]

    head :ok
  end
end
