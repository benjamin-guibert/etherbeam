# frozen_string_literal: true

class TransactionMethod < ApplicationRecord
  include HashHelper

  # Associations

  belongs_to :block_transaction, class_name: 'BlockTransaction'
  belongs_to :contract, class_name: 'Contract'
  has_many  :parameters,
            -> { with_addresses.order(index: :asc) },
            class_name: 'TransactionMethodParameter',
            inverse_of: :transaction_method,
            dependent: :destroy

  accepts_nested_attributes_for :parameters, allow_destroy: true

  # Validations

  attr_readonly :block_transaction, :contract_hash, :contract, :index, :name

  validates :index, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :contract_hash, presence: true, address: true
  validates :name, presence: true

  # Scopes

  scope :with_contract, -> { includes(:contract) }
  scope :with_transaction, -> { includes(:block_transaction) }
  scope :with_parameters, -> { includes(parameters: %i[addresses]) }

  # Callbacks

  before_validation :set_contract

  private

  def set_contract
    self.contract = Contract.find_by_sanitized_hash sanitize_hash contract_hash unless contract_id
  end
end
