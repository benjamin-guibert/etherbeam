# frozen_string_literal: true

require 'rails_helper'

describe ContractTokenPricesController, type: :request do
  include Helpers::AuthentificationHelper

  describe 'POST #save' do
    subject { response }

    context 'when ETH Server' do
      let(:headers) { user_auth_headers(:eth_server) }

      context 'when price changed' do
        let(:contract_token) do
          create :contract_token_with_price, address_hash: '0x0a00000000000000000000000000000000000111'
        end
        let(:params) do
          {
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000001'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before { post "/contract_tokens/#{contract_token.address_hash}/prices", params: params, headers: headers }

        it { is_expected.to have_http_status :created }

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
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000000'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before { post "/contract_tokens/#{contract_token.address_hash}/prices", params: params, headers: headers }

        it { is_expected.to have_http_status :ok }

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
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000001'
            }
          }
        end
        let(:token_price) { ContractTokenPrice.last }

        before { post "/contract_tokens/#{contract_token.address_hash}/prices", params: params, headers: headers }

        it { is_expected.to have_http_status :created }

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
            contract_token_price: {
              datetime: '2020-06-07T11:22:33.000Z',
              price: '1000000000000000001'
            }
          }
        end

        before do
          post '/contract_tokens/0x0A00000000000000000000000000000000000111/prices', params: params, headers: headers
        end

        it { is_expected.to have_http_status :not_found }
        it { expect(response.body).to be_empty }
      end
    end

    context 'when not ETH Server' do
      let(:contract_token) do
        create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111'
      end
      let(:params) do
        {
          contract_token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before do
        headers = user_auth_headers(:user)
        post "/contract_tokens/#{contract_token.address_hash}/prices", params: params, headers: headers
      end

      it { is_expected.to have_http_status :unauthorized }

      it { expect(contract_token.reload.prices).to be_empty }

      it { expect(response.body).to be_empty }
    end

    context 'when unauthentified' do
      let(:contract_token) do
        create :contract_token, address_hash: '0x0a00000000000000000000000000000000000111'
      end
      let(:params) do
        {
          contract_token_price: {
            datetime: '2020-06-07T11:22:33.000Z',
            price: '1000000000000000001'
          }
        }
      end

      before { post "/contract_tokens/#{contract_token.address_hash}/prices", params: params }

      it { is_expected.to have_http_status :unauthorized }

      it { expect(contract_token.reload.prices).to be_empty }

      it { expect(response.body).to be_empty }
    end
  end
end
