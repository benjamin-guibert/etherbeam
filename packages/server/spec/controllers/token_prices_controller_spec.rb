# frozen_string_literal: true

require 'rails_helper'

describe TokenPricesController, type: :controller do
  describe 'POST #save' do
    it do
      is_expected.to route(:post, 'tokens/0x0A00000000000000000000000000000000000111/prices')
        .to(
          controller: :token_prices,
          action: :save,
          address: '0x0A00000000000000000000000000000000000111'
        )
    end

    context 'when price changed' do
      let(:token) { create :token_with_price, address_hash: '0x0a00000000000000000000000000000000000111' }
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end
      let(:token_price) { TokenPrice.last }

      before do
        token
        post :save, params: params
      end

      it { is_expected.to respond_with :created }

      it { expect(token.reload.prices.count).to eq 2 }

      it do
        expect(token_price).to have_attributes(
          token: token,
          datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
          price: 1_000_000_000_000_000_001
        )
      end

      it { expect(response.body).to be_empty }
    end

    context 'when price unchanged' do
      let(:token) { create :token_with_price, address_hash: '0x0a00000000000000000000000000000000000111' }
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000000'
          }
        }
      end
      let(:token_price) { TokenPrice.last }

      before do
        token
        post :save, params: params
      end

      it { is_expected.to respond_with :ok }

      it { expect(token.reload.prices.count).to eq 1 }

      it do
        expect(token_price).to have_attributes(
          token: token,
          datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
          price: 1_000_000_000_000_000_000
        )
      end

      it { expect(response.body).to be_empty }
    end

    context 'when no price' do
      let(:token) { create :token, address_hash: '0x0a00000000000000000000000000000000000111' }
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end
      let(:token_price) { TokenPrice.last }

      before do
        token
        post :save, params: params
      end

      it { is_expected.to respond_with :created }

      it { expect(token.reload.prices.count).to eq 1 }

      it do
        expect(token_price).to have_attributes(
          token: token,
          datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
          price: 1_000_000_000_000_000_001
        )
      end

      it { expect(response.body).to be_empty }
    end

    context 'when token unknown' do
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before { post :save, params: params }

      it { is_expected.to respond_with :not_found }
      it { expect(response.body).to be_empty }
    end
  end
end
