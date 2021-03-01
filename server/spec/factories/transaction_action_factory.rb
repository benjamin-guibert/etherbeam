# frozen_string_literal: true

FactoryBot.define do
  factory :transaction_action do
    block_transaction do
      create :block_transaction
    end
    index { 0 }
    holder_address_hash { '0x0A00000000000000000000000000000000000111' }
  end
end
