# frozen_string_literal: true

class ContractTokensController < ApplicationController
  include ContractTokensConcern
  include HashHelper

  before_action :authenticate_user!

  def index
    @contract_tokens = ContractToken.with_prices

    render json: @contract_tokens,
           root: false,
           status: :ok,
           only: %i[sanitized_hash address_hash label abi name symbol decimals chart_pair],
           methods: %i[price price_1h price_1h_ratio price_1d price_1d_ratio price_1w price_1w_ratio price_1m
                       price_1m_ratio price_1y price_1y_ratio]
  end

  def show
    if sanitized_hash == sanitize_hash(ContractToken::WETH_HASH) then show_weth
    elsif params[:list] == 'actions' then show_with_actions
    else
      show_token
    end

    return head :not_found unless @contract_token
  end

  def show_token
    @contract_token = ContractToken.with_prices.find_by_sanitized_hash(sanitized_hash)

    render_token if @contract_token
  end

  def show_with_actions
    @contract_token = ContractToken.with_prices.with_actions.find_by_sanitized_hash(sanitized_hash)

    render_token_with_actions if @contract_token
  end

  def show_weth
    @contract_token = ContractToken.find_by_address_hash(ContractToken::WETH_HASH)

    render_token
  end

  private

  def sanitized_hash
    sanitize_hash params[:address]
  end
end
