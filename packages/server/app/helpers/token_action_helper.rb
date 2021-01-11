# frozen_string_literal: true

module TokenActionHelper
  include HashHelper

  def parse_transaction_token_actions(block_transaction)
    action = block_transaction.transaction_method_action
    logs = block_transaction.transaction_method_logs.to_a

    return unless action

    begin
      create_token_actions block_transaction, action, logs
    rescue StandardError => e
      block_transaction.add_log 'Error while parsing token actions.', type: :error
      logger.error e.message
      logger.error e.backtrace.join("\n")
    end
  end

  private

  def create_token_actions(block_transaction, action, logs)
    method_name = action.name
    if method_name == 'approve' && block_transaction.to_address.token?
      create_approval_token_action block_transaction
    elsif method_name == 'transfer' && block_transaction.to_address.token?
      create_transfer_token_action block_transaction, action
    elsif method_name.match(/^swap\S*$/)
      create_swap_token_actions block_transaction, action, logs
    else
      block_transaction.add_log "Cannot parse method '#{method_name}' to token action.", type: :warning
    end
  end

  def create_approval_token_action(block_transaction)
    TransactionAction.create!(
      block_transaction: block_transaction, holder_address_hash: block_transaction.from_address_hash,
      holder_address: block_transaction.from_address, index: 0, action_type: :approval,
      to_address_hash: block_transaction.to_address_hash, to_address: block_transaction.to_address
    )
  end

  def create_transfer_token_action(block_transaction, action)
    transfer_to_hash = parameter_by_index(action.parameters, 0).addresses.first

    TransactionAction.create!(
      block_transaction: block_transaction, holder_address_hash: block_transaction.from_address_hash,
      holder_address: block_transaction.from_address, index: 0, action_type: :transfer,
      from_address_hash: block_transaction.to_address_hash, from_address: block_transaction.to_address,
      from_amount: parameter_by_index(action.parameters, 1).decimal_value,
      to_address_hash: transfer_to_hash.address_hash, to_address: transfer_to_hash.address
    )
  end

  def create_swap_token_actions(block_transaction, action, logs)
    pathes = parameter_by_name(action.parameters, 'path').addresses

    pathes[0..-2].each do |path|
      create_swap_token_action block_transaction, logs, pathes, path
    end
  end

  def create_swap_token_action(block_transaction, logs, pathes, path)
    next_path = next_path(pathes, path)
    action_params = {
      block_transaction: block_transaction, holder_address_hash: block_transaction.from_address_hash,
      holder_address: block_transaction.from_address, index: path.index,
      action_type: :swap, from_address_hash: path.address_hash, from_address: path.address,
      to_address_hash: next_path.address_hash, to_address: next_path.address
    }
    add_amount_params(block_transaction, action_params, logs)

    TransactionAction.create!(action_params)
  end

  def next_path(pathes, path)
    pathes[path.index + 1]
  end

  def add_amount_params(block_transaction, action_params, logs)
    action_params[:from_amount] = calculate_amount logs, action_params[:from_address_hash]
    action_params[:to_amount] = calculate_amount logs, action_params[:to_address_hash]

    return unless action_params[:from_amount].zero? || action_params[:to_amount].zero?

    block_transaction.add_log 'A swap token amount is invalid.', type: :warning
  end

  def calculate_amount(logs, hash)
    amount = 0
    transfer_logs(logs, hash).each { |m| amount += parameter_by_index(m.parameters, 2).decimal_value }
    amount
  end

  def transfer_logs(logs, hash)
    logs.select { |m| m.contract.sanitized_hash == sanitize_hash(hash) && m.name == 'Transfer' }
  end

  def transfer_to_hash(values); end

  def parameter_by_index(parameters, index)
    parameters.find { |p| p.index == index }
  end

  def parameter_by_name(parameters, name)
    parameters.find { |p| p.name == name }
  end
end
