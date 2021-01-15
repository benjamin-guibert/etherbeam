# frozen_string_literal: true

FactoryBot.define do
  factory :block_transaction do
    transaction_hash { generate :hash }
    datetime { DateTime.new(2020, 4, 5, 11, 22, 33) }

    factory :block_transaction_mined do
      status { :mined }
      block_number { 1000 }
      from_address_hash { '0x0A00000000000000000000000000000000000111' }
      value { 10_000_000_000_000_000_000_000.0 }
      gas_limit { 1_000 }
      gas_unit_price { 500.0 }

      factory :block_transaction_with_action do
        after(:create) do |transaction|
          create :transaction_method_with_parameter, block_transaction: transaction

          transaction.reload
        end
      end
    end
  end
end
