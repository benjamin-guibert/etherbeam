# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  describe 'enum' do
    it { is_expected.to define_enum_for(:user_type).with_values(%i[user administrator system]) }
  end

  describe 'validation' do
    subject { create :user }

    it { is_expected.to be_valid }

    describe '#user_type' do
      it { is_expected.not_to have_readonly_attribute :user_type }
      it { is_expected.not_to validate_presence_of :user_type }
      it { is_expected.not_to validate_uniqueness_of :user_type }
      it { is_expected.to allow_value(:user).for :user_type }
      it { is_expected.to allow_value(:administrator).for :user_type }
      it { is_expected.to allow_value(:system).for :user_type }
    end

    describe '#email' do
      it { is_expected.not_to have_readonly_attribute :email }
      it { is_expected.to validate_presence_of :email }
    end

    describe '#name' do
      it { is_expected.not_to have_readonly_attribute :name }
      it { is_expected.to validate_presence_of :name }
      it { is_expected.not_to validate_uniqueness_of :name }
    end
  end

  describe 'callback' do
    it { is_expected.to callback(:set_provider).before(:validation) }
    it { is_expected.to callback(:set_uid).before(:validation) }
  end

  describe 'method' do
    subject { build :user }

    describe '#set_provider' do
      describe 'when null' do
        before { subject.set_provider }

        it { is_expected.to have_attributes provider: 'email' }
      end

      describe 'when not null' do
        before do
          subject.provider = 'name'
          subject.set_provider
        end

        it { is_expected.to have_attributes provider: 'name' }
      end
    end

    describe '#set_uid' do
      describe 'when null' do
        before { subject.set_uid }

        it { is_expected.to have_attributes uid: subject.email }
      end

      describe 'when not null' do
        before do
          subject.uid = 'myuid'
          subject.set_uid
        end

        it { is_expected.to have_attributes uid: 'myuid' }
      end

      describe 'when email null' do
        before do
          subject.email = nil
          subject.set_uid
        end

        it { is_expected.to have_attributes uid: '' }
      end
    end
  end
end
