# frozen_string_literal: true

FactoryBot.define do
  factory :token do
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

    factory :token_with_price do
      before(:create) do |token|
        create :token_price, token: token

        token.reload
      end
    end

    factory :token_with_prices do
      before(:create) do |token|
        create :token_price, price: 2_000.0, datetime: 2.minutes.ago, token: token
        create :token_price, price: 1_000.0, datetime: 2.hours.ago, token: token
        create :token_price, price: 4_000.0, datetime: 2.days.ago, token: token
        create :token_price, price: 8_000.0, datetime: 2.weeks.ago, token: token
        create :token_price, price: 2_000.0, datetime: 2.months.ago, token: token
        create :token_price, price: 500.0, datetime: 2.years.ago, token: token

        token.reload
      end
    end
  end
end
