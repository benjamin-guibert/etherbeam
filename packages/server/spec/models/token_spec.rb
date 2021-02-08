# frozen_string_literal: true

require 'rails_helper'

describe Token, type: :model do
  describe 'association' do
    it { is_expected.to have_many(:prices).dependent(:destroy) }
  end

  describe 'validation' do
    subject { create :token }

    it { is_expected.to be_valid }

    describe '#name' do
      it { is_expected.not_to have_readonly_attribute :name }
      it { is_expected.to validate_presence_of :name }
      it { is_expected.not_to validate_uniqueness_of :name }
    end

    describe '#symbol' do
      it { is_expected.not_to have_readonly_attribute :symbol }
      it { is_expected.to validate_presence_of :symbol }
      it { is_expected.not_to validate_uniqueness_of :symbol }
    end

    describe '#decimals' do
      it { is_expected.not_to have_readonly_attribute :decimals }
      it { is_expected.to validate_presence_of :decimals }
      it { is_expected.not_to validate_uniqueness_of :decimals }
      it { is_expected.to validate_numericality_of(:decimals).is_greater_than_or_equal_to 0 }
    end
  end

  describe 'scope' do
    let(:addresses) do
      [
        create(:token),
        create(:contract),
        create(:address, :wallet)
      ]
    end

    before { addresses }

    describe 'default' do
      subject { Token.all }

      it { is_expected.to have_attributes count: 3 }
      it { is_expected.to include addresses[0] }
    end
  end

  describe 'callback' do
    describe 'before validation' do
      describe '#set_type' do
        it { is_expected.to callback(:set_type).before(:validation) }

        subject { create :token }

        it { is_expected.to have_attributes address_type: 'token' }
      end
    end
  end

  describe 'method' do
    describe 'prices' do
      subject { token }

      context 'when prices exist' do
        let(:token) do
          token = create(:token)
          create :token_price, datetime: 2.days.ago, price: 4_000, token: token
          create :token_price, datetime: 2.hours.ago, price: 1_000, token: token
          create :token_price, datetime: 2.months.ago, price: 2_000, token: token
          create :token_price, datetime: 2.minutes.ago, price: 2_000, token: token
          create :token_price, datetime: 2.years.ago, price: 500, token: token
          create :token_price, datetime: 2.weeks.ago, price: 8_000, token: token

          token
        end

        it do
          is_expected.to have_attributes(
            price: 2_000,
            price_1h: 1_000,
            price_1h_ratio: 2,
            price_1d: 4_000,
            price_1d_ratio: 0.5,
            price_1w: 8_000,
            price_1w_ratio: 0.25,
            price_1m: 2_000,
            price_1m_ratio: 1,
            price_1y: 500,
            price_1y_ratio: 4
          )
        end
      end

      context 'when no new price' do
        let(:token) do
          token = create(:token)
          create :token_price, datetime: 30.minutes.ago, price: 2_000, token: token

          token
        end

        it do
          is_expected.to have_attributes(
            price: 2_000,
            price_1h: nil,
            price_1h_ratio: nil,
            price_1d: nil,
            price_1d_ratio: nil,
            price_1w: nil,
            price_1w_ratio: nil,
            price_1m: nil,
            price_1m_ratio: nil,
            price_1y: nil,
            price_1y_ratio: nil
          )
        end
      end

      context 'when no price exists' do
        let(:token) { create(:token) }

        it do
          is_expected.to have_attributes(
            price: nil,
            price_1h: nil,
            price_1h_ratio: nil,
            price_1d: nil,
            price_1d_ratio: nil,
            price_1w: nil,
            price_1w_ratio: nil,
            price_1m: nil,
            price_1m_ratio: nil,
            price_1y: nil,
            price_1y_ratio: nil
          )
        end
      end
    end
  end
end
