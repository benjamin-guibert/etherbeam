# frozen_string_literal: true

require 'rails_helper'

describe Address, type: :model do
  include Helpers::Models::ValidationHelper

  describe 'enum' do
    it { is_expected.to define_enum_for(:address_type).with_values(%i[unknown wallet contract token]) }
  end

  describe 'association' do
    it { is_expected.to have_many :logs }
    it { is_expected.to have_many :holding_transaction_actions }
    it { is_expected.to have_many :from_transaction_actions }
    it { is_expected.to have_many :to_transaction_actions }

    it { is_expected.to accept_nested_attributes_for(:logs).allow_destroy(false) }
  end

  describe 'validation' do
    subject { create :address }

    it { should be_valid }

    describe '#address_hash' do
      it { is_expected.to have_readonly_attribute :address_hash }
      it { is_expected.to validate_presence_of :address_hash }
      it { is_expected.not_to validate_uniqueness_of :address_hash }
      it { validates_address subject, :address_hash }
    end

    describe '#address_type' do
      it { is_expected.to have_readonly_attribute :address_type }
      it { is_expected.to validate_presence_of :address_type }
      it { is_expected.not_to validate_uniqueness_of :address_type }
      it { is_expected.to allow_value(:unknown).for :address_type }
      it { is_expected.to allow_value(:wallet).for :address_type }
      it { is_expected.to allow_value(:token).for :address_type }
      it { is_expected.to allow_value(:contract).for :address_type }
    end

    describe '#label' do
      it { is_expected.not_to have_readonly_attribute :label }
      it { is_expected.to validate_presence_of :label }
      it { is_expected.not_to validate_uniqueness_of :label }
    end
  end

  describe 'callback' do
    describe 'before validation' do
      describe '#sanitize_address_hash' do
        let(:address) { create :address, address_hash: '0x0A00000000000000000000000000000000000111' }

        subject { address }

        it do
          is_expected.to have_attributes(
            sanitized_hash: '0x0a00000000000000000000000000000000000111',
            address_hash: '0x0A00000000000000000000000000000000000111'
          )
        end
      end
    end
  end
end
