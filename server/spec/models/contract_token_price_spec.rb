# frozen_string_literal: true

require 'rails_helper'

describe ContractTokenPrice, type: :model do
  describe 'association' do
    it { is_expected.to belong_to :contract_token }
  end

  describe 'validation' do
    subject { create :contract_token_price }

    it { is_expected.to be_valid }

    describe '#token' do
      it { is_expected.to have_readonly_attribute :contract_token }
    end

    describe '#datetime' do
      it { is_expected.to have_readonly_attribute :datetime }
      it { is_expected.to validate_presence_of :datetime }
      it { is_expected.not_to validate_uniqueness_of :datetime }
    end

    describe '#price' do
      it { is_expected.to have_readonly_attribute :price }
      it { is_expected.to validate_presence_of :price }
      it { is_expected.not_to validate_uniqueness_of :price }
      it { is_expected.to validate_numericality_of(:price).is_greater_than_or_equal_to 0 }
    end
  end

  describe 'scope' do
    describe '#trashable' do
      let(:token_prices) do
        [
          create(:contract_token_price, datetime: 6.days.ago.beginning_of_day + 1.hour),
          create(:contract_token_price, datetime: 6.days.ago.beginning_of_day + 10.hours),
          create(:contract_token_price, datetime: 6.days.ago.beginning_of_day + 20.hours),
          create(:contract_token_price, datetime: 5.days.ago.beginning_of_day + 1.hour),
          create(:contract_token_price, datetime: 5.days.ago.beginning_of_day + 10.hours),
          create(:contract_token_price, datetime: 5.days.ago.beginning_of_day + 20.hours),
          create(:contract_token_price, datetime: 2.days.ago.beginning_of_day + 1.hour),
          create(:contract_token_price, datetime: 2.days.ago.beginning_of_day + 10.hours),
          create(:contract_token_price, datetime: 2.days.ago.beginning_of_day + 20.hours),
          create(:contract_token_price, datetime: 1.days.ago.beginning_of_day + 1.hour),
          create(:contract_token_price, datetime: 1.days.ago.beginning_of_day + 10.hours),
          create(:contract_token_price, datetime: 1.days.ago.beginning_of_day + 20.hours),
          create(:contract_token_price, datetime: DateTime.now.beginning_of_day + 1.hour),
          create(:contract_token_price, datetime: DateTime.now.beginning_of_day + 10.hours),
          create(:contract_token_price, datetime: DateTime.now.beginning_of_day + 20.hours)
        ]
      end

      before do
        allow(Time).to receive(:now).and_return(DateTime.now.end_of_day)

        token_prices
      end

      subject { ContractTokenPrice.trashable }

      it { is_expected.to have_attributes count: 6 }
      it { is_expected.to include token_prices[1] }
      it { is_expected.to include token_prices[2] }
      it { is_expected.to include token_prices[4] }
      it { is_expected.to include token_prices[5] }
      it { is_expected.to include token_prices[7] }
      it { is_expected.to include token_prices[8] }
    end
  end

  describe 'method' do
    describe '#before_datetime' do
      let(:prices) do
        [
          create(:contract_token_price, datetime: 4.hours.ago),
          create(:contract_token_price, datetime: 2.hours.ago),
          create(:contract_token_price, datetime: 1.hours.ago),
          create(:contract_token_price, datetime: 5.hours.ago)
        ]
      end

      before { prices }

      context 'when previous price' do
        subject { ContractTokenPrice.before_datetime 3.hours.ago }

        it { expect(subject.first).to eq prices[0] }
      end

      context 'when no previous price' do
        subject { ContractTokenPrice.before_datetime 6.hours.ago }

        it { is_expected.to eq [] }
      end
    end
  end
end
