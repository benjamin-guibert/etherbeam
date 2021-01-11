# frozen_string_literal: true

class TokensController < ApplicationController
  include TokensConcern
  include HashHelper

  def index
    @tokens = Token.with_prices

    render json: @tokens,
           root: false,
           status: :ok,
           only: %i[sanitized_hash address_hash label abi name symbol decimals],
           methods: %i[price price_1h price_1h_ratio price_1d price_1d_ratio price_1w price_1w_ratio price_1m
                       price_1m_ratio price_1y price_1y_ratio]
  end

  def show
    if sanitized_hash == Token::WETH_HASH then show_weth
    elsif params[:list] == 'actions' then show_with_actions
    else
      show_token
    end

    return head :not_found unless @token
  end

  def show_token
    @token = Token.with_prices.find_by_address_hash(sanitized_hash)

    render_token if @token
  end

  def show_with_actions
    @token = Token.with_prices.with_actions.find_by_address_hash(sanitized_hash)

    render_token_with_actions if @token
  end

  def show_weth
    @token = Token.find_by_address_hash(Token::WETH_HASH)

    render_token
  end

  private

  def sanitized_hash
    sanitize_hash params[:address]
  end
end
