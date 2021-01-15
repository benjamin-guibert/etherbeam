# frozen_string_literal: true

class BlockTransaction < ApplicationRecord
  include Loggable
  include HashHelper

  # Enums

  enum status: {
    pending: 0,
    mined: 1,
    validated: 2,
    cancelled: 3
  }

  # Associations

  belongs_to :from_address, class_name: 'Address', optional: true
  belongs_to :to_address, class_name: 'Address', optional: true
  has_one :transaction_method_action, -> { where(index: nil) },
          class_name: 'TransactionMethod',
          inverse_of: :block_transaction,
          dependent: :destroy
  has_many  :transaction_method_logs,
            -> { where.not(index: nil).order(index: :asc) },
            class_name: 'TransactionMethod',
            inverse_of: :block_transaction,
            dependent: :destroy
  has_many  :transaction_actions,
            -> { order(index: :asc) },
            class_name: 'TransactionAction',
            inverse_of: :block_transaction,
            dependent: :destroy

  accepts_nested_attributes_for :transaction_method_action, allow_destroy: true
  accepts_nested_attributes_for :transaction_method_logs, allow_destroy: true

  # Validations

  attr_readonly :sanitized_hash, :transaction_hash

  validates :sanitized_hash, presence: true, hash: true, uniqueness: true
  validates :transaction_hash, presence: true, hash: true
  validates :status, inclusion: { in: statuses.keys }
  validates :datetime, presence: true
  validates :block_number, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :from_address_hash, address: true
  validates :to_address_hash, address: true
  validates :value, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :gas_used, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :gas_limit, presence: true, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :gas_unit_price, presence: true, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  # Scopes

  scope :with_addresses, -> { includes(:from_address, :to_address) }
  scope :with_methods, lambda {
    includes(transaction_method_action: { parameters: { addresses: :address } },
             transaction_method_logs: { parameters: { addresses: :address } })
  }
  scope :with_actions, -> { includes(:transaction_actions) }

  # Callbacks

  before_validation :sanitize_address_hash
  before_save :set_addresses

  # Methods

  def gas_ratio
    gas_used.to_f / gas_limit if gas_used && gas_limit
  end

  def gas_fee
    gas_used * gas_unit_price if gas_used && gas_unit_price
  end

  def add_log(message, type: :info)
    Log.create!(block_transaction: self, log_type: type, message: message)
  end

  private

  def sanitize_address_hash
    self.sanitized_hash = sanitize_hash transaction_hash
  end

  def set_addresses
    self.from_address = Address.find_by_sanitized_hash sanitize_hash from_address_hash if from_address_hash
    self.to_address = Address.find_by_sanitized_hash sanitize_hash to_address_hash if to_address_hash
  end
end
