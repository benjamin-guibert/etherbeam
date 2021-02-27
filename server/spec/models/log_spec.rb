# frozen_string_literal: true

require 'rails_helper'

describe Log, type: :model do
  describe 'enum' do
    it { is_expected.to define_enum_for(:log_type).with_values(%i[info warning error]) }
  end

  describe 'association' do
    it { is_expected.to belong_to(:address).optional }
    it { is_expected.to belong_to(:block_transaction).optional }
  end

  describe 'validation' do
    subject { create :log }

    it { is_expected.to be_valid }

    describe '#log_type' do
      it { is_expected.not_to have_readonly_attribute :log_type }
      it { is_expected.not_to validate_presence_of :log_type }
      it { is_expected.not_to validate_uniqueness_of :log_type }
      it { is_expected.to allow_value(:info).for :log_type }
      it { is_expected.to allow_value(:warning).for :log_type }
      it { is_expected.to allow_value(:error).for :log_type }
    end

    describe '#message' do
      it { is_expected.not_to have_readonly_attribute :message }
      it { is_expected.to validate_presence_of :message }
      it { is_expected.not_to validate_uniqueness_of :message }
    end
  end
end
