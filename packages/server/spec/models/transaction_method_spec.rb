# frozen_string_literal: true

require 'rails_helper'

describe TransactionMethod, type: :model do
  describe 'association' do
    it { is_expected.to belong_to :block_transaction }
    it { is_expected.to belong_to :contract }
    it { is_expected.to have_many(:parameters).dependent(:destroy) }

    it { is_expected.to accept_nested_attributes_for(:parameters).allow_destroy(true) }
  end

  describe 'validation' do
    subject { create :transaction_method }

    it { is_expected.to be_valid }

    describe '#block_transaction' do
      it { is_expected.to have_readonly_attribute :block_transaction }
    end

    describe '#contract_hash' do
      it { is_expected.to have_readonly_attribute :contract_hash }
      it { is_expected.to validate_presence_of :contract_hash }
      it { is_expected.not_to validate_uniqueness_of :contract_hash }
    end

    describe '#contract' do
      it { is_expected.to have_readonly_attribute :contract }
    end

    describe '#index' do
      it { is_expected.to have_readonly_attribute :index }
      it { is_expected.not_to validate_presence_of :index }
      it { is_expected.not_to validate_uniqueness_of :index }
      it { is_expected.to validate_numericality_of(:index).is_greater_than_or_equal_to(0) }
    end

    describe '#name' do
      it { is_expected.to have_readonly_attribute :name }
      it { is_expected.to validate_presence_of :name }
      it { is_expected.not_to validate_uniqueness_of :name }
    end
  end

  describe 'callback' do
    describe 'before validation' do
      describe '#set_contract' do
        it { is_expected.to callback(:set_contract).before :validation }

        let(:contract) { create :contract }
        subject { create :transaction_method, contract: nil, contract_hash: contract.address_hash }

        it { is_expected.to have_attributes contract: contract }
      end
    end
  end
end
