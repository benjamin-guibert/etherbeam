# frozen_string_literal: true

FactoryBot.define do
  factory :token_price do
    datetime { DateTime.new(2020, 4, 5, 11, 22, 33) }
    price { 1_000_000_000_000_000_000.0 }
    token
  end
end
