# frozen_string_literal: true

require 'rails_helper'

describe AddressValidator, type: :model do
  with_model :model do
    table do |t|
      t.string :value
    end

    model do
      validates :value, address: true
    end
  end

  subject { Model.new }

  context 'when valid' do
    it { is_expected.to allow_value('0x000000000000000000ABCDEF0123456789abcdef').for :value }
  end

  context 'when not hexadecimal' do
    let(:error_message) { 'is not hexadecimal' }

    it do
      is_expected.not_to allow_value('0x00000000000000000000000g0123456789abcdef')
        .for(:value).with_message(error_message)
    end
    it do
      is_expected.not_to allow_value('1x0000000000000000000000000123456789abcdef')
        .for(:value).with_message(error_message)
    end
    it do
      is_expected.not_to allow_value('0a0000000000000000000000000123456789abcdef')
        .for(:value).with_message(error_message)
    end
  end

  describe 'when invalid length' do
    let(:error_message) { 'length is not valid' }

    it do
      is_expected.not_to allow_value('0x0000000000000000000000000123456789abcde')
        .for(:value).with_message(error_message)
    end
    it do
      is_expected.not_to allow_value('0x0000000000000000000000000123456789abcdef0')
        .for(:value).with_message(error_message)
    end
  end
end
