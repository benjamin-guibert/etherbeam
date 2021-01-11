# frozen_string_literal: true

require 'rails_helper'

describe TokensController, type: :controller do
  describe 'GET #index' do
    it { is_expected.to route(:get, '/tokens').to(controller: :tokens, action: :index) }

    let(:token) { create :token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111' }
    let(:body) { JSON.parse(response.body) }

    before do
      token

      get :index
    end

    it { is_expected.to respond_with :ok }

    it { expect(body).to have_attributes count: 2 }

    it do
      expect(body[1]).to match(
        {
          'sanitized_hash' => token.sanitized_hash,
          'address_hash' => token.address_hash,
          'label' => token.label,
          'abi' => token.abi,
          'name' => token.name,
          'symbol' => token.symbol,
          'decimals' => token.decimals,
          'price' => token.price.as_json,
          'price_1h' => token.price_1h.as_json,
          'price_1h_ratio' => token.price_1h_ratio,
          'price_1d' => token.price_1d.as_json,
          'price_1d_ratio' => token.price_1d_ratio,
          'price_1w' => token.price_1w.as_json,
          'price_1w_ratio' => token.price_1w_ratio,
          'price_1m' => token.price_1m.as_json,
          'price_1m_ratio' => token.price_1m_ratio,
          'price_1y' => token.price_1y.as_json,
          'price_1y_ratio' => token.price_1y_ratio
        }
      )
    end
  end

  describe 'GET #show' do
    it do
      is_expected.to route(:get, '/tokens/0x0A00000000000000000000000000000000000111')
        .to(controller: :tokens, action: :show, address: '0x0A00000000000000000000000000000000000111')
    end

    context 'when token exists' do
      let(:token) { create :token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111' }
      let(:body) { JSON.parse(response.body) }

      before do
        token
        get :show, params: { address: '0x0A00000000000000000000000000000000000111' }
      end

      it { is_expected.to respond_with :ok }

      it do
        expect(body).to match(
          {
            'sanitized_hash' => token.sanitized_hash,
            'address_hash' => token.address_hash,
            'label' => token.label,
            'abi' => token.abi,
            'name' => token.name,
            'symbol' => token.symbol,
            'decimals' => token.decimals,
            'website' => token.website,
            'whitepaper' => token.whitepaper,
            'discord' => token.discord,
            'facebook' => token.facebook,
            'github' => token.github,
            'linkedin' => token.linkedin,
            'reddit' => token.reddit,
            'telegram' => token.telegram,
            'twitter' => token.twitter,
            'price' => token.price.as_json,
            'price_1h' => token.price_1h.as_json,
            'price_1h_ratio' => token.price_1h_ratio,
            'price_1d' => token.price_1d.as_json,
            'price_1d_ratio' => token.price_1d_ratio,
            'price_1w' => token.price_1w.as_json,
            'price_1w_ratio' => token.price_1w_ratio,
            'price_1m' => token.price_1m.as_json,
            'price_1m_ratio' => token.price_1m_ratio,
            'price_1y' => token.price_1y.as_json,
            'price_1y_ratio' => token.price_1y_ratio
          }
        )
      end
    end

    context 'with actions' do
      let(:token) { create :token_with_prices, :full, address_hash: '0x0a00000000000000000000000000000000000111' }
      let(:other_token) { create :token }
      let(:holder) { create :address, :wallet }
      let(:from_transaction_action) do
        create :transaction_action, action_type: :swap, holder_address_hash: holder.address_hash,
                                    holder_address: holder, from_address_hash: token.address_hash,
                                    from_address: token, from_amount: 1000, to_address_hash: other_token.address_hash,
                                    to_address: other_token, to_amount: 2000
      end
      let(:to_transaction_action) do
        create :transaction_action, action_type: :swap, holder_address_hash: holder.address_hash,
                                    holder_address: holder, from_address_hash: other_token.address_hash,
                                    from_address: other_token, from_amount: 2000, to_address_hash: token.address_hash,
                                    to_address: token, to_amount: 1000
      end
      let(:body) { JSON.parse(response.body) }

      before do
        from_transaction_action
        to_transaction_action

        get :show, params: { address: '0x0A00000000000000000000000000000000000111', list: 'actions' }
      end

      it { is_expected.to respond_with :ok }

      it do
        expect(body).to match(
          {
            'sanitized_hash' => token.sanitized_hash,
            'address_hash' => token.address_hash,
            'label' => token.label,
            'abi' => token.abi,
            'name' => token.name,
            'symbol' => token.symbol,
            'decimals' => token.decimals,
            'website' => token.website,
            'whitepaper' => token.whitepaper,
            'discord' => token.discord,
            'facebook' => token.facebook,
            'github' => token.github,
            'linkedin' => token.linkedin,
            'reddit' => token.reddit,
            'telegram' => token.telegram,
            'twitter' => token.twitter,
            'price' => token.price.as_json,
            'price_1h' => token.price_1h.as_json,
            'price_1h_ratio' => token.price_1h_ratio,
            'price_1d' => token.price_1d.as_json,
            'price_1d_ratio' => token.price_1d_ratio,
            'price_1w' => token.price_1w.as_json,
            'price_1w_ratio' => token.price_1w_ratio,
            'price_1m' => token.price_1m.as_json,
            'price_1m_ratio' => token.price_1m_ratio,
            'price_1y' => token.price_1y.as_json,
            'price_1y_ratio' => token.price_1y_ratio,
            'from_transaction_actions' => body['from_transaction_actions'],
            'to_transaction_actions' => body['to_transaction_actions']
          }
        )
      end

      it do
        expect(body['from_transaction_actions']).to match(
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
              'address_hash' => token.address_hash,
              'address_type' => token.address_type,
              'label' => token.label,
              'name' => token.name,
              'symbol' => token.symbol,
              'decimals' => token.decimals
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
        expect(body['to_transaction_actions']).to match(
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
              'address_hash' => token.address_hash,
              'address_type' => token.address_type,
              'label' => token.label,
              'name' => token.name,
              'symbol' => token.symbol,
              'decimals' => token.decimals
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

    describe 'when WETH' do
      let(:body) { JSON.parse(response.body) }

      before { get :show, params: { address: '0xc02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2' } }

      it { is_expected.to respond_with :ok }

      it { expect(body).to be }
      it { expect(body['from_transaction_actions']).to be_nil }
      it { expect(body['to_transaction_actions']).to be_nil }
    end
  end
end
