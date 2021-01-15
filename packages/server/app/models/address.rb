# frozen_string_literal: true

class Address < ApplicationRecord
  include Loggable
  include HashHelper

  # Enums

  enum address_type: {
    unknown: 0,
    wallet: 1,
    contract: 2,
    token: 3
  }

  # Associations

  has_many :holding_transaction_actions, -> { with_transaction.order('block_transactions.datetime DESC') },
           class_name: 'TransactionAction', foreign_key: 'holder_address_id', inverse_of: :holder_address
  has_many :from_transaction_actions, -> { with_transaction.order('block_transactions.datetime DESC') },
           class_name: 'TransactionAction', foreign_key: 'from_address_id', inverse_of: :from_address
  has_many :to_transaction_actions, -> { with_transaction.order('block_transactions.datetime DESC') },
           class_name: 'TransactionAction', foreign_key: 'to_address_id', inverse_of: :to_address

  # Validations

  attr_readonly :sanitized_hash, :address_hash, :address_type

  validates :sanitized_hash, presence: true, uniqueness: true, address: true
  validates :address_hash, presence: true, address: true
  validates :address_type, presence: true, inclusion: { in: address_types.keys }
  validates :label, presence: true

  # Callbacks

  before_validation :sanitize_address_hash

  # Methods

  def add_log(message, type: :info)
    Log.create!(address: self, log_type: type, message: message)
  end

  private

  def sanitize_address_hash
    self.sanitized_hash = sanitize_hash address_hash
  end
end
