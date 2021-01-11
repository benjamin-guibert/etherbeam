# frozen_string_literal: true

class TokenPrice < ApplicationRecord
  # Associations

  belongs_to :token, class_name: 'Token', inverse_of: :prices

  # Validations

  attr_readonly :token, :datetime, :price

  validates :datetime, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # Scopes

  scope :before_datetime, ->(datetime) { where('datetime <= ?', datetime).order(datetime: :desc) }
end
