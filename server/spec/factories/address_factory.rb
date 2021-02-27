# frozen_string_literal: true

FactoryBot.define do
  factory :address do
    address_hash { generate :address }
    address_type { :unknown }
    label { 'My Address' }

    trait :wallet do
      address_type { :wallet }
      label { 'My Wallet' }
    end
  end
end
