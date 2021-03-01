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
  # scope :trashable, lambda {
  #                     select('array_agg(id) as ids').group("date_trunc('hour', datetime)").map do |group|
  #                       group[1..]
  #                     end
  #                   }
  scope :trashable, lambda {
    where('datetime <= ?', 2.days.ago)
      .group_by { |p| p.datetime.day }
      .transform_values { |p| p[1..] }
      .values.flatten
  }
end
