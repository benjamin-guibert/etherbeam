# frozen_string_literal: true

class ContractTokenPrice < ApplicationRecord
  # Associations

  belongs_to :contract_token, class_name: 'ContractToken', inverse_of: :prices

  # Validations

  attr_readonly :contract_token, :datetime, :price

  validates :datetime, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # Scopes

  scope :before_datetime, ->(datetime) { where('datetime <= ?', datetime).order(datetime: :desc) }
end
