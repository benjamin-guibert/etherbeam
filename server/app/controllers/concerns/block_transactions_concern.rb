# frozen_string_literal: true

module BlockTransactionsConcern
  def save_transaction_params(transaction_params) # rubocop:disable Metrics/MethodLength
    transaction_params.permit(:transaction_hash, :status, :block_number, :datetime, :from_address_hash,
                              :to_address_hash, :value, :gas_limit, :gas_unit_price, :gas_used,
                              transaction_method_action_attributes: [
                                :contract_hash, :name, { parameters_attributes: [
                                  :index, :name, :raw_type, :raw_value, :decimal_value,
                                  { addresses_attributes: %i[index address_hash] }
                                ] }
                              ],
                              transaction_method_logs_attributes: [
                                :index, :contract_hash, :name, { parameters_attributes: [
                                  :index, :name, :raw_type, :raw_value, :decimal_value,
                                  { addresses_attributes: %i[index address_hash] }
                                ] }
                              ], logs_attributes: %i[log_type message])
  end

  def render_transaction_hashes
    render json: @transactions, status: :ok, root: false,
           only: :transaction_hash
  end

  def render_transactions # rubocop:disable Metrics/MethodLength
    render json: @transactions, status: :ok, root: false,
           only: %i[transaction_hash status block_number datetime from_address_hash to_address_hash value
                    gas_used gas_limit gas_unit_price],
           methods: %i[gas_ratio gas_fee],
           include: {
             from_address: { only: %i[address_hash address_type label] },
             to_address: { only: %i[address_hash address_type label] },
             transaction_method_action: {
               only: %i[name],
               include: {
                 contract: { only: %i[address_hash address_type label] },
                 parameters: {
                   only: %i[index name parameter_type raw_type raw_value decimal_value],
                   include: {
                     addresses: {
                       only: :address_hash,
                       include: {
                         address: { only: %i[address_hash address_type label] }
                       }
                     }
                   }
                 }
               }
             },
             transaction_method_logs: {
               only: %i[index name],
               include: {
                 contract: { only: %i[address_hash address_type label] },
                 parameters: {
                   only: %i[index name parameter_type raw_type raw_value decimal_value],
                   include: {
                     addresses: {
                       only: :address_hash,
                       include: {
                         address: { only: %i[address_hash address_type label] }
                       }
                     }
                   }
                 }
               }
             }
           }
  end
end
