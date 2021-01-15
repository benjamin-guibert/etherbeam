# frozen_string_literal: true

class TransactionAction < ApplicationRecord
  # Enums

  enum action_type: {
    unknown: 0,
    approval: 1,
    transfer: 2,
    swap: 3
  }

  # Associations

  belongs_to :block_transaction, class_name: 'BlockTransaction', inverse_of: :transaction_actions
  belongs_to :holder_address, class_name: 'Address', inverse_of: :holding_transaction_actions, optional: true
  belongs_to :from_address, class_name: 'Address', inverse_of: :from_transaction_actions, optional: true
  belongs_to :to_address, class_name: 'Address', inverse_of: :to_transaction_actions, optional: true

  # Validations

  attr_readonly :block_transaction, :index, :holder_address_hash, :holder_address

  validates :index, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :action_type, inclusion: { in: action_types.keys }
  validates :holder_address_hash, presence: true, address: true
  validates :from_address_hash, address: true
  validates :from_amount, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :to_address_hash, address: true
  validates :to_amount, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # Scopes

  scope :with_transaction, -> { includes(:block_transaction) }
end
