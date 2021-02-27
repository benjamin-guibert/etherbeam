# frozen_string_literal: true

FactoryBot.define do
  factory :transaction_method_parameter_address do
    parameter { create :transaction_method_parameter, parameter_type: :addresses }
    index { 0 }
    address_hash { generate :address }
  end
end
