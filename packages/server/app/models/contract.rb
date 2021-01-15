# frozen_string_literal: true

class Contract < Address
  # Validations

  attr_readonly :abi

  validates :address_type, presence: true, inclusion: { in: %w[contract token] }
  validates :abi, presence: true

  # Scopes

  default_scope { where(address_type: :contract).or where(address_type: :token) }
end
