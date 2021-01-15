# frozen_string_literal: true

FactoryBot.define do
  factory :contract do
    address_hash { generate :address }
    address_type { :contract }
    label { 'My Contract' }
    abi { '[]' }
  end
end
