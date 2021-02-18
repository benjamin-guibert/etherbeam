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
