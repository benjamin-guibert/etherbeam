# frozen_string_literal: true

class TransactionMethodParameterAddress < ApplicationRecord
  include HashHelper

  # Associations

  belongs_to :parameter, class_name: 'TransactionMethodParameter', inverse_of: :addresses
  belongs_to :address, class_name: 'Address', optional: true

  # Validations

  attr_readonly :parameter, :index

  validates :index, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :address_hash, address: true

  # Scopes

  scope :with_transaction, -> { includes(parameter: { transaction_method: :block_transaction }) }

  # Callback

  before_save :set_address

  private

  def set_address
    self.address = Address.find_by_sanitized_hash sanitize_hash address_hash if address_hash
  end
end
