# frozen_string_literal: true

require 'rails_helper'

describe TransactionMethodParameterAddress, type: :model do
  include Helpers::Models::ValidationHelper

  describe 'association' do
    it { is_expected.to belong_to :parameter }
    it { is_expected.to belong_to(:address).optional }
  end

  describe 'validation' do
    subject { create :transaction_method_parameter_address }

    it { is_expected.to be_valid }

    describe '#parameter' do
      it { is_expected.to have_readonly_attribute :parameter }
    end

    describe '#index' do
      it { is_expected.to have_readonly_attribute :index }
      it { is_expected.to validate_presence_of :index }
      it { is_expected.not_to validate_uniqueness_of :index }
      it { should validate_numericality_of(:index).is_greater_than_or_equal_to 0 }
    end

    describe '#address_hash' do
      it { is_expected.not_to have_readonly_attribute :address_hash }
      it { is_expected.not_to validate_presence_of :address_hash }
      it { is_expected.not_to validate_uniqueness_of :address_hash }
      it { validates_address subject, :address_hash }
    end
  end

  describe 'callback' do
    describe 'before save' do
      describe '#set_address' do
        it { is_expected.to callback(:set_address).before :save }

        let(:address) { create :address, address_hash: '0x0A00000000000000000000000000000000000111' }

        before do
          address
        end

        subject do
          create :transaction_method_parameter_address, address_hash: '0x0A00000000000000000000000000000000000111'
        end

        it { is_expected.to have_attributes address: address }
      end
    end
  end
end
