# frozen_string_literal: true

require 'rails_helper'

describe Contract, type: :model do
  include Helpers::Models::ValidationHelper

  describe 'validation' do
    subject { create :contract }

    it { is_expected.to be_valid }

    describe '#address_type' do
      it { is_expected.not_to allow_value(:unknown).for :address_type }
      it { is_expected.not_to allow_value(:wallet).for :address_type }
      it { is_expected.to allow_value(:token).for :address_type }
      it { is_expected.to allow_value(:contract).for :address_type }
    end

    describe '#abi' do
      it { is_expected.to have_readonly_attribute :abi }
      it { is_expected.to validate_presence_of :abi }
      it { is_expected.not_to validate_uniqueness_of :abi }
    end
  end

  describe 'scope' do
    let(:addresses) do
      [
        create(:contract),
        create(:contract, address_type: :token),
        create(:address),
        create(:address, :wallet)
      ]
    end

    before { addresses }

    describe 'default' do
      subject { Contract.all }

      it { is_expected.to have_attributes count: 5 }
      it { is_expected.to include addresses[0] }
      it { is_expected.to include addresses[1] }
    end
  end
end
