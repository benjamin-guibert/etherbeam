# frozen_string_literal: true

require 'rails_helper'

describe ContractTokensController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  describe 'GET #index' do
    it { is_expected.to route(:get, '/contract_tokens').to(controller: :contract_tokens, action: :index) }

    let(:contract_token) { create :contract_token_with_prices, :full }
    let(:json) { JSON.parse(response.body) }

    context 'when authentified' do
      before do
        authenticate_user create :user
        contract_token

        get :index
      end

      it { is_expected.to respond_with :ok }

      it { expect(json).to have_attributes count: 3 }

      it do
        expect(json[2]).to match(
          {
            'sanitized_hash' => contract_token.sanitized_hash,
            'address_hash' => contract_token.address_hash,
            'label' => contract_token.label,
            'abi' => contract_token.abi,
            'name' => contract_token.name,
            'symbol' => contract_token.symbol,
            'decimals' => contract_token.decimals,
            'chart_pair' => contract_token.chart_pair,
            'price' => contract_token.price.as_json,
            'price_1h' => contract_token.price_1h.as_json,
            'price_1h_ratio' => contract_token.price_1h_ratio,
            'price_1d' => contract_token.price_1d.as_json,
            'price_1d_ratio' => contract_token.price_1d_ratio,
            'price_1w' => contract_token.price_1w.as_json,
            'price_1w_ratio' => contract_token.price_1w_ratio,
            'price_1m' => contract_token.price_1m.as_json,
            'price_1m_ratio' => contract_token.price_1m_ratio,
            'price_1y' => contract_token.price_1y.as_json,
            'price_1y_ratio' => contract_token.price_1y_ratio
          }
        )
      end
    end

    context 'when unauthentified' do
      before do
        contract_token

        get :index
      end

      it { should_render_unauthorized }
    end
  end

  describe 'GET #show' do
    let(:json) { JSON.parse(response.body) }

    context 'when authentified' do
      before { authenticate_user create :user }

      context 'when token exists' do
        let(:contract_token) do
          create :contract_token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111'
        end

        before do
          contract_token

          get :show, params: { address: '0x0A00000000000000000000000000000000000111' }
        end

        it { is_expected.to respond_with :ok }

        it do
          expect(json).to match(
            {
              'sanitized_hash' => contract_token.sanitized_hash,
              'address_hash' => contract_token.address_hash,
              'label' => contract_token.label,
              'abi' => contract_token.abi,
              'name' => contract_token.name,
              'symbol' => contract_token.symbol,
              'decimals' => contract_token.decimals,
              'chart_pair' => contract_token.chart_pair,
              'website' => contract_token.website,
              'whitepaper' => contract_token.whitepaper,
              'discord' => contract_token.discord,
              'facebook' => contract_token.facebook,
              'github' => contract_token.github,
              'linkedin' => contract_token.linkedin,
              'reddit' => contract_token.reddit,
              'telegram' => contract_token.telegram,
              'twitter' => contract_token.twitter,
              'price' => contract_token.price.as_json,
              'price_1h' => contract_token.price_1h.as_json,
              'price_1h_ratio' => contract_token.price_1h_ratio,
              'price_1d' => contract_token.price_1d.as_json,
              'price_1d_ratio' => contract_token.price_1d_ratio,
              'price_1w' => contract_token.price_1w.as_json,
              'price_1w_ratio' => contract_token.price_1w_ratio,
              'price_1m' => contract_token.price_1m.as_json,
              'price_1m_ratio' => contract_token.price_1m_ratio,
              'price_1y' => contract_token.price_1y.as_json,
              'price_1y_ratio' => contract_token.price_1y_ratio
            }
          )
        end
      end

      context 'with actions' do
        let(:contract_token) do
          create :contract_token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111'
        end
        let(:other_token) { create :contract_token }
        let(:holder) { create :address, :wallet }
        let(:from_transaction_action) do
          create :transaction_action, action_type: :swap, holder_address_hash: holder.address_hash,
                                      holder_address: holder, from_address_hash: contract_token.address_hash,
                                      from_address: contract_token, from_amount: 1000,
                                      to_address_hash: other_token.address_hash,
                                      to_address: other_token, to_amount: 2000
        end
        let(:to_transaction_action) do
          create :transaction_action, action_type: :swap, holder_address_hash: holder.address_hash,
                                      holder_address: holder, from_address_hash: other_token.address_hash,
                                      from_address: other_token, from_amount: 2000,
                                      to_address_hash: contract_token.address_hash,
                                      to_address: contract_token, to_amount: 1000
        end

        before do
          from_transaction_action
          to_transaction_action

          get :show, params: { address: '0x0A00000000000000000000000000000000000111', list: 'actions' }
        end

        it { is_expected.to respond_with :ok }

        it do
          expect(json).to match(
            {
              'sanitized_hash' => contract_token.sanitized_hash,
              'address_hash' => contract_token.address_hash,
              'label' => contract_token.label,
              'abi' => contract_token.abi,
              'name' => contract_token.name,
              'symbol' => contract_token.symbol,
              'decimals' => contract_token.decimals,
              'chart_pair' => contract_token.chart_pair,
              'website' => contract_token.website,
              'whitepaper' => contract_token.whitepaper,
              'discord' => contract_token.discord,
              'facebook' => contract_token.facebook,
              'github' => contract_token.github,
              'linkedin' => contract_token.linkedin,
              'reddit' => contract_token.reddit,
              'telegram' => contract_token.telegram,
              'twitter' => contract_token.twitter,
              'price' => contract_token.price.as_json,
              'price_1h' => contract_token.price_1h.as_json,
              'price_1h_ratio' => contract_token.price_1h_ratio,
              'price_1d' => contract_token.price_1d.as_json,
              'price_1d_ratio' => contract_token.price_1d_ratio,
              'price_1w' => contract_token.price_1w.as_json,
              'price_1w_ratio' => contract_token.price_1w_ratio,
              'price_1m' => contract_token.price_1m.as_json,
              'price_1m_ratio' => contract_token.price_1m_ratio,
              'price_1y' => contract_token.price_1y.as_json,
              'price_1y_ratio' => contract_token.price_1y_ratio,
              'from_transaction_actions' => json['from_transaction_actions'],
              'to_transaction_actions' => json['to_transaction_actions']
            }
          )
        end

        it do
          expect(json['from_transaction_actions']).to match(
            [{
              'block_transaction' => {
                'transaction_hash' => from_transaction_action.block_transaction.transaction_hash,
                'status' => from_transaction_action.block_transaction.status,
                'block_number' => from_transaction_action.block_transaction.block_number,
                'datetime' => from_transaction_action.block_transaction.datetime.as_json
              },
              'index' => from_transaction_action.index,
              'action_type' => from_transaction_action.action_type,
              'holder_address_hash' => from_transaction_action.holder_address_hash,
              'holder_address' => {
                'address_hash' => holder.address_hash,
                'address_type' => holder.address_type,
                'label' => holder.label
              },
              'from_address_hash' => from_transaction_action.from_address_hash,
              'from_address' => {
                'address_hash' => contract_token.address_hash,
                'address_type' => contract_token.address_type,
                'label' => contract_token.label,
                'name' => contract_token.name,
                'symbol' => contract_token.symbol,
                'decimals' => contract_token.decimals
              },
              'from_amount' => from_transaction_action.from_amount.as_json,
              'to_address_hash' => from_transaction_action.to_address_hash,
              'to_address' => {
                'address_hash' => other_token.address_hash,
                'address_type' => other_token.address_type,
                'label' => other_token.label,
                'name' => other_token.name,
                'symbol' => other_token.symbol,
                'decimals' => other_token.decimals
              },
              'to_amount' => from_transaction_action.to_amount.as_json
            }]
          )
        end

        it do
          expect(json['to_transaction_actions']).to match(
            [{
              'block_transaction' => {
                'transaction_hash' => to_transaction_action.block_transaction.transaction_hash,
                'status' => to_transaction_action.block_transaction.status,
                'block_number' => to_transaction_action.block_transaction.block_number,
                'datetime' => to_transaction_action.block_transaction.datetime.as_json
              },
              'index' => to_transaction_action.index,
              'action_type' => to_transaction_action.action_type,
              'holder_address_hash' => to_transaction_action.holder_address_hash,
              'holder_address' => {
                'address_hash' => holder.address_hash,
                'address_type' => holder.address_type,
                'label' => holder.label
              },
              'from_address_hash' => to_transaction_action.from_address_hash,
              'from_address' => {
                'address_hash' => other_token.address_hash,
                'address_type' => other_token.address_type,
                'label' => other_token.label,
                'name' => other_token.name,
                'symbol' => other_token.symbol,
                'decimals' => other_token.decimals
              },
              'from_amount' => to_transaction_action.from_amount.as_json,
              'to_address_hash' => to_transaction_action.to_address_hash,
              'to_address' => {
                'address_hash' => contract_token.address_hash,
                'address_type' => contract_token.address_type,
                'label' => contract_token.label,
                'name' => contract_token.name,
                'symbol' => contract_token.symbol,
                'decimals' => contract_token.decimals
              },
              'to_amount' => to_transaction_action.to_amount.as_json
            }]
          )
        end
      end

      context 'when token unknown' do
        before { get :show, params: { address: '0x0A00000000000000000000000000000000000111' } }

        it { is_expected.to respond_with :not_found }

        it { expect(response.body).to be_empty }
      end

      context 'when WETH' do
        before { get :show, params: { address: '0xC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2' } }

        it { is_expected.to respond_with :ok }

        it { expect(json).to be }
        it { expect(json['from_transaction_actions']).to be_nil }
        it { expect(json['to_transaction_actions']).to be_nil }
      end
    end

    context 'when unauthentified' do
      let(:contract_token) do
        create :contract_token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111'
      end

      before do
        contract_token

        get :show, params: { address: '0x0A00000000000000000000000000000000000111' }
      end

      it { should_render_unauthorized }
    end
  end
end
