# frozen_string_literal: true

require 'rails_helper'

describe TransactionMethodParameter, type: :model do
  describe 'enum' do
    it do
      is_expected.to define_enum_for(:parameter_type).with_values(
        %i[unknown unsigned_integer address addresses]
      )
    end
  end

  describe 'association' do
    it { is_expected.to belong_to :transaction_method }
    it { is_expected.to have_many(:addresses).dependent(:destroy) }

    it { is_expected.to accept_nested_attributes_for(:addresses).allow_destroy(true) }
  end

  describe 'validation' do
    subject { create :transaction_method_parameter }

    it { is_expected.to be_valid }

    describe '#transaction_method' do
      it { is_expected.to have_readonly_attribute :transaction_method }
    end

    describe '#index' do
      it { is_expected.to have_readonly_attribute :index }
      it { is_expected.to validate_presence_of :index }
      it { is_expected.not_to validate_uniqueness_of :index }
      it { is_expected.to validate_numericality_of(:index).is_greater_than_or_equal_to(0) }
    end

    describe '#name' do
      it { is_expected.to have_readonly_attribute :name }
      it { is_expected.to validate_presence_of :name }
      it { is_expected.not_to validate_uniqueness_of :name }
    end

    describe '#parameter_type' do
      it { is_expected.to have_readonly_attribute :parameter_type }
      it { is_expected.not_to validate_presence_of :parameter_type }
      it { is_expected.not_to validate_uniqueness_of :parameter_type }
      it { is_expected.to allow_value(:unknown).for :parameter_type }
      it { is_expected.to allow_value(:unsigned_integer).for :parameter_type }
      it { is_expected.to allow_value(:address).for :parameter_type }
      it { is_expected.to allow_value(:addresses).for :parameter_type }
    end

    describe '#raw_type' do
      it { is_expected.to have_readonly_attribute :raw_type }
      it { is_expected.to validate_presence_of :raw_type }
      it { is_expected.not_to validate_uniqueness_of :raw_type }
    end
  end

  describe 'callback' do
    describe 'before validation' do
      describe '#set_parameter_type' do
        it { is_expected.to callback(:set_parameter_type).before :validation }

        context 'when unsigned integer' do
          subject { create :transaction_method_parameter, raw_type: 'uint256' }

          it { is_expected.to have_attributes parameter_type: 'unsigned_integer' }
        end

        context 'when address' do
          subject { create :transaction_method_parameter, raw_type: 'address' }

          it { is_expected.to have_attributes parameter_type: 'address' }
        end

        context 'when addresses' do
          subject { create :transaction_method_parameter, raw_type: 'address[]' }

          it { is_expected.to have_attributes parameter_type: 'addresses' }
        end

        context 'when unknown' do
          subject { create :transaction_method_parameter, raw_type: '?' }

          it { is_expected.to have_attributes parameter_type: 'unknown' }
        end
      end
    end
  end
end
