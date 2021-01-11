# frozen_string_literal: true

class BlockTransactionsController < ApplicationController
  include BlockTransactionsConcern
  include HashHelper
  include TokenActionHelper
  include Pagy::Backend

  def index
    case params[:status]
    when 'pending' then return pending
    when 'mined' then return mined
    end

    @pagy, @transactions = pagy(BlockTransaction.with_addresses.with_methods.with_actions.order(datetime: :desc))

    render_transactions
  end

  def pending
    @pagy, @transactions = pagy(BlockTransaction.with_addresses.with_methods.where(status: :pending)
                                    .order(datetime: :desc))

    render_transactions
  end

  def mined
    @transactions = BlockTransaction.select(:transaction_hash)
                                    .where(status: :mined)
                                    .order(datetime: :asc)

    render_transaction_hashes
  end

  def save
    status = if params[:block_transactions]
               save_list
             else
               save_transaction save_transaction_params(params[:block_transaction])
             end

    head status
  end

  private

  def save_list
    BlockTransaction.transaction do
      params[:block_transactions].each do |transaction_params|
        save_transaction save_transaction_params(transaction_params)
      end
    end

    :ok
  end

  def save_transaction(transaction_params)
    @transaction = BlockTransaction.find_by_sanitized_hash(sanitize_hash(transaction_params[:transaction_hash]))

    if @transaction
      update_transaction transaction_params
    else
      create_transaction transaction_params
    end
  end

  def create_transaction(transaction_params)
    @transaction = BlockTransaction.create!(transaction_params)
    parse_transaction_token_actions @transaction

    :created
  end

  def update_transaction(transaction_params)
    @transaction.update!(transaction_params)
    parse_transaction_token_actions @transaction

    :ok
  end
end
