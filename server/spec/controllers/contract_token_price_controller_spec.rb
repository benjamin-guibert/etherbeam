# frozen_string_literal: true

require 'rails_helper'

describe ContractTokenPricesController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  describe 'POST #save' do
    let(:json) { JSON.parse(response.body) }

    it do
      is_expected.to route(:post, 'contract_tokens/0x0A00000000000000000000000000000000000111/prices')
        .to(
          controller: :contract_token_prices,
          action: :save,
          address: '0x0A00000000000000000000000000000000000111'
        )
    end

    context 'when ETH Server' do
      before { authenticate_user create :user, :eth_server }

      context 'when price changed' do
        let(:contract_token) do
          create :contract_token_with_price, address_hash: '0x0a00000000000000000000000000000000000111'
        end
        let(:params) do
          {
            address: '0x0A00000000000000000000000000000000000111',
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000001'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before do
          contract_token

          post :save, params: params
        end

        it { is_expected.to respond_with :created }

        it { expect(contract_token.reload.prices.count).to eq 2 }

        it do
          expect(token_price).to have_attributes(
            contract_token: contract_token,
            datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
            price: 1_000_000_000_000_000_001
          )
        end

        it { expect(response.body).to be_empty }
      end

      context 'when price unchanged' do
        let(:contract_token) do
          create :contract_token_with_price, address_hash: '0x0a00000000000000000000000000000000000111'
        end
        let(:params) do
          {
            address: '0x0A00000000000000000000000000000000000111',
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000000'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before do
          contract_token

          post :save, params: params
        end

        it { is_expected.to respond_with :ok }

        it { expect(contract_token.reload.prices.count).to eq 1 }

        it do
          expect(token_price).to have_attributes(
            contract_token: contract_token,
            datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
            price: 1_000_000_000_000_000_000
          )
        end

        it { expect(response.body).to be_empty }
      end

      context 'when no price' do
        let(:contract_token) { create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111' }
        let(:params) do
          {
            address: '0x0A00000000000000000000000000000000000111',
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000001'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before do
          contract_token

          post :save, params: params
        end

        it { is_expected.to respond_with :created }

        it { expect(contract_token.reload.prices.count).to eq 1 }

        it do
          expect(token_price).to have_attributes(
            contract_token: contract_token,
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
            contract_token_price: {
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

    context 'when user' do
      before { authenticate_user create :user }

      let(:contract_token) do
        create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111'
      end
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          contract_token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before do
        contract_token

        post :save, params: params
      end

      before { post :save, params: params }

      it { should_render_unauthorized }
    end

    context 'when administrator' do
      before { authenticate_user create :user, :administrator }

      let(:contract_token) do
        create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111'
      end
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          contract_token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before do
        contract_token

        post :save, params: params
      end

      before { post :save, params: params }

      it { should_render_unauthorized }

      it { expect(contract_token.reload.prices).to be_empty }
    end

    context 'when unauthentified' do
      let(:contract_token) do
        create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111'
      end
      let(:params) do
        {
          address: '0x0A00000000000000000000000000000000000111',
          contract_token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before do
        contract_token

        post :save, params: params
      end

      before { post :save, params: params }

      it { should_render_unauthorized }

      it { expect(contract_token.reload.prices).to be_empty }
    end
  end
end
