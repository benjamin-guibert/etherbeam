# frozen_string_literal: true

FactoryBot.define do
  factory :contract_token do
    address_hash { generate :address }
    label { 'Token (TKN)' }
    abi { '[]' }
    name { 'Token' }
    symbol { 'TKN' }
    decimals { 18 }

    trait :full do
      website { 'https://token.finance' }
      whitepaper { 'https://token.finance/whitepaper.pdf' }
      github { 'https://github.com/token' }
      linkedin { 'https://linkedin.com/token' }
      facebook { 'https://facebook.com/token' }
      reddit { 'https://reddit.com/token' }
      twitter { 'https://twitter.com/token' }
      telegram { 'https://telegram.com/token' }
      discord { 'https://discord.com/token' }
    end

    factory :contract_token_with_price do
      before(:create) do |token|
        create :contract_token_price, contract_token: token

        token.reload
      end
    end

    factory :contract_token_with_prices do
      before(:create) do |token|
        create :contract_token_price, price: 2_000.0, datetime: 2.minutes.ago, contract_token: token
        create :contract_token_price, price: 1_000.0, datetime: 2.hours.ago, contract_token: token
        create :contract_token_price, price: 4_000.0, datetime: 2.days.ago, contract_token: token
        create :contract_token_price, price: 8_000.0, datetime: 2.weeks.ago, contract_token: token
        create :contract_token_price, price: 2_000.0, datetime: 2.months.ago, contract_token: token
        create :contract_token_price, price: 500.0, datetime: 2.years.ago, contract_token: token

        token.reload
      end
    end
  end
end
