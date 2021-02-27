# frozen_string_literal: true

require 'rails_helper'

describe TransactionAction, type: :model do
  include Helpers::Models::ValidationHelper

  describe 'association' do
    it { is_expected.to belong_to :block_transaction }
    it { is_expected.to belong_to(:holder_address).optional }
    it { is_expected.to belong_to(:from_address).optional }
    it { is_expected.to belong_to(:to_address).optional }
  end

  describe 'validation' do
    subject { create :transaction_action }

    it { is_expected.to be_valid }

    describe '#index' do
      it { is_expected.to have_readonly_attribute :index }
      it { is_expected.to validate_presence_of :index }
      it { is_expected.not_to validate_uniqueness_of :index }
      it { is_expected.to validate_numericality_of(:index).is_greater_than_or_equal_to 0 }
    end

    describe '#holder_address_hash' do
      it { is_expected.to have_readonly_attribute :holder_address_hash }
      it { is_expected.to validate_presence_of :holder_address_hash }
      it { is_expected.not_to validate_uniqueness_of :holder_address_hash }
      it { validates_address subject, :holder_address_hash }
    end

    describe '#from_address_hash' do
      it { is_expected.not_to have_readonly_attribute :from_address_hash }
      it { is_expected.not_to validate_presence_of :from_address_hash }
      it { is_expected.not_to validate_uniqueness_of :from_address_hash }
      it { validates_address subject, :from_address_hash }
    end

    describe '#from_amount' do
      it { is_expected.not_to have_readonly_attribute :from_amount }
      it { is_expected.not_to validate_presence_of :from_amount }
      it { is_expected.not_to validate_uniqueness_of :from_amount }
      it { is_expected.to validate_numericality_of(:from_amount).is_greater_than_or_equal_to 0 }
    end

    describe '#to_address_hash' do
      it { is_expected.not_to have_readonly_attribute :to_address_hash }
      it { is_expected.not_to validate_presence_of :to_address_hash }
      it { is_expected.not_to validate_uniqueness_of :to_address_hash }
      it { validates_address subject, :to_address_hash }
    end

    describe '#to_amount' do
      it { is_expected.not_to have_readonly_attribute :to_amount }
      it { is_expected.not_to validate_presence_of :to_amount }
      it { is_expected.not_to validate_uniqueness_of :to_amount }
      it { should validate_numericality_of(:to_amount).is_greater_than_or_equal_to 0 }
    end
  end
end
