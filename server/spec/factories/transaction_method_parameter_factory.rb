# frozen_string_literal: true

FactoryBot.define do
  factory :transaction_method_parameter do
    transaction_method
    index { 0 }
    name { 'input1' }
    raw_type { 'unknown' }
  end
end
