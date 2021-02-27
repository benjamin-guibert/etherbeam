# frozen_string_literal: true

class ContractTokenPricesController < ApplicationController
  include HashHelper

  before_action :authenticate_eth_server!

  def save
    @contract_token = ContractToken.find_by_sanitized_hash sanitize_hash params[:address]

    return head :not_found unless @contract_token

    @contract_token_price = @contract_token.prices.last

    if contract_token_price_params[:price]&.to_d == @contract_token_price&.price
      update_token_price
    else
      create_token_price
    end
  end

  private

  def contract_token_price_params
    params.require(:contract_token_price).permit(:datetime, :price)
  end

  def create_token_price
    create_params = contract_token_price_params
    create_params[:contract_token_id] = @contract_token.id
    ContractTokenPrice.create! create_params

    head :created
  end

  def update_token_price
    @contract_token_price.update! datetime: contract_token_price_params[:datetime]

    head :ok
  end
end
