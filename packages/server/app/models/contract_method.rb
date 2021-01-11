# frozen_string_literal: true

class ContractMethod < ApplicationRecord
  # Enums

  enum method_type: {
    function: 0,
    constructor: 1,
    fallback: 2,
    event: 3
  }
  enum state_mutability: {
    state_unknown: 0,
    pure: 1,
    view: 2,
    non_payable: 3,
    payable: 4
  }, _suffix: true

  # Associations

  belongs_to :contract, class_name: 'Contract', inverse_of: :contract_methods
  has_many  :inputs,
            -> { inputs.order(index: :asc) },
            class_name: 'ContractMethodParameter',
            inverse_of: :contract_method,
            dependent: :destroy
  has_many  :outputs,
            -> { outputs.order(index: :asc) },
            class_name: 'ContractMethodParameter',
            inverse_of: :contract_method,
            dependent: :destroy
  has_many  :transaction_methods,
            -> { with_transaction.order('block_transactions.datetime DESC') },
            class_name: 'TransactionMethod',
            inverse_of: :contract_method

  accepts_nested_attributes_for :inputs, allow_destroy: true
  accepts_nested_attributes_for :outputs, allow_destroy: true

  # Validations

  attr_readonly :contract, :method_type, :state_mutability

  validates :name, uniqueness: { scope: :contract_id, case_insensitive: true }, if: :name
  validates :method_type, inclusion: { in: method_types.keys }
  validates :state_mutability, presence: true, inclusion: { in: state_mutabilities.keys }
end
