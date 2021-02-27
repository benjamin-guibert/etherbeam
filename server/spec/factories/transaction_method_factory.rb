# frozen_string_literal: true

FactoryBot.define do
  factory :transaction_method do
    block_transaction
    contract_hash { '0x0A00000000000000000000000000000000001111' }
    contract { create :contract, address_hash: '0x0A00000000000000000000000000000000001111' }
    name { 'function1' }

    factory :transaction_method_with_parameter do
      after(:build) do |transaction_method|
        create :transaction_method_parameter, transaction_method: transaction_method, index: 0, name: 'input1',
                                              raw_value: '1000', decimal_value: 1000.0

        transaction_method.reload
      end
    end
  end
end
