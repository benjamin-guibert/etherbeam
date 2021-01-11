# frozen_string_literal: true

require 'rails_helper'

describe BlockTransaction, type: :model do
  include Helpers::Models::ValidationHelper

  describe 'enum' do
    it { is_expected.to define_enum_for(:status).with_values(%i[pending mined validated cancelled]) }
  end

  describe 'association' do
    it { is_expected.to have_many(:logs).dependent(:destroy) }
    it { is_expected.to belong_to(:from_address).optional }
    it { is_expected.to belong_to(:to_address).optional }
    it { is_expected.to have_one(:transaction_method_action).dependent(:destroy) }
    it { is_expected.to have_many(:transaction_method_logs).dependent(:destroy) }
    it { is_expected.to have_many(:transaction_actions).dependent(:destroy) }

    it { is_expected.to accept_nested_attributes_for(:logs).allow_destroy(false) }
    it { is_expected.to accept_nested_attributes_for(:transaction_method_action).allow_destroy(true) }
    it { is_expected.to accept_nested_attributes_for(:transaction_method_logs).allow_destroy(true) }
  end

  describe 'validation' do
    subject { create :block_transaction }

    it { is_expected.to be_valid }

    describe '#transaction_hash' do
      it { is_expected.to have_readonly_attribute :transaction_hash }
      it { is_expected.to validate_presence_of :transaction_hash }
      it { is_expected.not_to validate_uniqueness_of(:transaction_hash) }
      it { validates_hash subject, :transaction_hash }
    end

    describe '#status' do
      it { is_expected.not_to have_readonly_attribute :status }
      it { is_expected.not_to validate_presence_of :status }
      it { is_expected.not_to validate_uniqueness_of :status }
      it { is_expected.to allow_value(:pending).for :status }
      it { is_expected.to allow_value(:mined).for :status }
      it { is_expected.to allow_value(:validated).for :status }
      it { is_expected.to allow_value(:cancelled).for :status }
    end

    describe '#datetime' do
      it { is_expected.not_to have_readonly_attribute :datetime }
      it { is_expected.to validate_presence_of :datetime }
      it { is_expected.not_to validate_uniqueness_of :datetime }
    end

    describe '#block_number' do
      it { is_expected.not_to have_readonly_attribute :block_number }
      it { is_expected.not_to validate_presence_of :block_number }
      it { is_expected.not_to validate_uniqueness_of :block_number }
      it { is_expected.to validate_numericality_of(:block_number).is_greater_than_or_equal_to 0 }
    end

    describe '#from_address_hash' do
      it { is_expected.not_to have_readonly_attribute :from_address_hash }
      it { is_expected.not_to validate_presence_of :from_address_hash }
      it { is_expected.not_to validate_uniqueness_of :from_address_hash }
      it { validates_address subject, :from_address_hash }
    end

    describe '#to_address_hash' do
      it { is_expected.not_to have_readonly_attribute :to_address_hash }
      it { is_expected.not_to validate_presence_of :to_address_hash }
      it { is_expected.not_to validate_uniqueness_of :to_address_hash }
      it { validates_address subject, :to_address_hash }
    end

    describe '#value' do
      it { is_expected.not_to have_readonly_attribute :value }
      it { is_expected.not_to validate_presence_of :value }
      it { is_expected.not_to validate_uniqueness_of :value }
      it { is_expected.to validate_numericality_of(:value).is_greater_than_or_equal_to 0 }
    end

    describe '#gas_used' do
      it { is_expected.not_to have_readonly_attribute :gas_used }
      it { is_expected.not_to validate_presence_of :gas_used }
      it { is_expected.not_to validate_uniqueness_of :gas_used }
      it { is_expected.to validate_numericality_of(:gas_used).is_greater_than_or_equal_to(0).allow_nil }
    end

    describe '#gas_limit' do
      it { is_expected.not_to have_readonly_attribute :gas_limit }
      it { is_expected.not_to validate_presence_of :gas_limit }
      it { is_expected.not_to validate_uniqueness_of :gas_limit }
      it { should validate_numericality_of(:gas_limit).is_greater_than_or_equal_to(0).allow_nil }
    end

    describe '#gas_unit_price' do
      it { is_expected.not_to have_readonly_attribute :gas_unit_price }
      it { is_expected.not_to validate_presence_of :gas_unit_price }
      it { is_expected.not_to validate_uniqueness_of :gas_unit_price }
      it { is_expected.to validate_numericality_of(:gas_unit_price).is_greater_than_or_equal_to(0).allow_nil }
    end
  end

  describe 'callback' do
    describe 'before validation' do
      describe '#sanitize_address_hash' do
        let(:block_transaction) do
          create :block_transaction,
                 transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111'
        end

        subject { block_transaction }

        it do
          is_expected.to have_attributes(
            sanitized_hash: '0x0a00000000000000000000000000000000000000000000000000000000000111',
            transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111'
          )
        end
      end
    end

    describe 'before save' do
      describe '#set_addresses' do
        it { is_expected.to callback(:set_addresses).before :save }

        let(:address_from) { create :address, address_hash: '0x0A00000000000000000000000000000000000111' }
        let(:address_to) { create :address, address_hash: '0x0A00000000000000000000000000000000000222' }

        before do
          address_from
          address_to
        end

        subject do
          create :block_transaction, from_address_hash: '0x0A00000000000000000000000000000000000111',
                                     to_address_hash: '0x0A00000000000000000000000000000000000222'
        end

        it { is_expected.to have_attributes from_address: address_from, to_address: address_to }
      end
    end
  end

  describe 'method' do
    describe '#gas_ratio' do
      let(:block_transaction) { create :block_transaction }

      subject { block_transaction.gas_ratio }

      context 'when defined' do
        before do
          block_transaction.gas_limit = 1000
          block_transaction.gas_used = 500
        end

        it { is_expected.to eq 0.5 }
      end

      context 'when gas limit undefined' do
        before do
          block_transaction.gas_limit = nil
          block_transaction.gas_used = 500
        end

        it { is_expected.to eq nil }
      end

      context 'when gas used undefined' do
        before do
          block_transaction.gas_limit = 1000
          block_transaction.gas_used = nil
        end

        it { is_expected.to eq nil }
      end
    end

    describe '#gas_fee' do
      let(:block_transaction) { create :block_transaction }

      subject { block_transaction.gas_fee }

      context 'when defined' do
        before do
          block_transaction.gas_unit_price = 500.0
          block_transaction.gas_used = 1000
        end

        it { is_expected.to eq 500_000.0 }
      end

      context 'when gas unit price undefined' do
        before do
          block_transaction.gas_unit_price = nil
          block_transaction.gas_used = 1000
        end

        it { is_expected.to eq nil }
      end

      context 'when gas used undefined' do
        before do
          block_transaction.gas_unit_price = 500.0
          block_transaction.gas_used = nil
        end

        it { is_expected.to eq nil }
      end
    end
  end
end
