# frozen_string_literal: true

class TransactionMethodParameter < ApplicationRecord
  # Enums

  enum parameter_type: {
    unknown: 0,
    unsigned_integer: 1,
    address: 2,
    addresses: 3
  }

  # Associations

  belongs_to :transaction_method, class_name: 'TransactionMethod', inverse_of: :parameters
  has_many  :addresses,
            -> { order(index: :asc) },
            class_name: 'TransactionMethodParameterAddress',
            inverse_of: :parameter,
            foreign_key: 'parameter_id',
            dependent: :destroy

  accepts_nested_attributes_for :addresses, allow_destroy: true

  # Validations

  attr_readonly :transaction_method, :name, :index, :raw_type, :parameter_type

  validates :index, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :name, presence: true
  validates :raw_type, presence: true

  # Scopes

  scope :with_addresses, -> { includes(:addresses) }

  # Callbacks

  before_validation :set_parameter_type

  private

  def set_parameter_type
    self.parameter_type = case raw_type
                          when /^uint[0-9]*$/ then :unsigned_integer
                          when 'address' then :address
                          when 'address[]' then :addresses
                          else :unknown
                          end
  end
end
