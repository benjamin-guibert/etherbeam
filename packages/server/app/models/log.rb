# frozen_string_literal: true

class Log < ApplicationRecord
  # Enums

  enum log_type: {
    info: 0,
    warning: 1,
    error: 2
  }

  # Associations

  belongs_to :address, class_name: 'Address', inverse_of: :logs, optional: true
  belongs_to :block_transaction, class_name: 'BlockTransaction', inverse_of: :logs, optional: true

  # Validations

  validates :log_type, inclusion: { in: log_types.keys }
  validates :message, presence: true
end
