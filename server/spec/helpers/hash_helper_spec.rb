# frozen_string_literal: true

require 'rails_helper'

describe HashHelper, type: :helper do
  describe '#sanitize_hash' do
    context 'when address' do
      subject { sanitize_hash '0xABCd000000000000000000000000000000000DeF' }

      it { is_expected.to eq '0xabcd000000000000000000000000000000000def' }
    end

    context 'when hash' do
      subject { sanitize_hash '0xABCd000000000000000000000000000000000000000000000000000000000DeF' }

      it { is_expected.to eq '0xabcd000000000000000000000000000000000000000000000000000000000def' }
    end

    context 'when too short' do
      subject { sanitize_hash '0x' }

      it { is_expected.to eq '0x' }
    end

    context 'when nil' do
      subject { sanitize_hash nil }

      it { is_expected.to be_nil }
    end
  end
end
