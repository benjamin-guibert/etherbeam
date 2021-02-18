# frozen_string_literal: true

require 'rails_helper'

describe BlockTransactionsController, type: :request do
  include Helpers::AuthentificationHelper

  describe 'GET #index' do
    subject { response }

    context 'all' do
      context 'list not empty' do
        let(:addresses) { create_list :address, 2 }
        let(:transactions) do
          create_list :block_transaction, 5
          transactions = [
            create(:block_transaction, datetime: DateTime.new(2020, 5, 6, 11, 22, 33)),
            create(:block_transaction_with_action,
                   status: :pending, datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
                   from_address_hash: addresses[0].address_hash, to_address_hash: addresses[1].address_hash)
          ]
          create_list :block_transaction, 5, status: :validated

          transactions
        end
        let(:body) { JSON.parse(response.body) }

        before do
          transactions

          get '/block_transactions', params: { items: 5 }
        end

        it { is_expected.to have_http_status :ok }

        it do
          expect(headers).to match(hash_including(
                                     'Current-Page' => '1',
                                     'Page-Items' => '5',
                                     'Total-Pages' => '3',
                                     'Total-Count' => '12'
                                   ))
        end

        it { expect(body).to have_attributes count: 5 }

        it { expect(body[0]['transaction_hash']).to eq transactions[1].transaction_hash }
        it { expect(body[1]['transaction_hash']).to eq transactions[0].transaction_hash }

        it do
          expect(body[0]).to match(
            'transaction_hash' => transactions[1].transaction_hash,
            'status' => transactions[1].status,
            'datetime' => transactions[1].datetime.as_json,
            'block_number' => transactions[1].block_number,
            'from_address_hash' => transactions[1].from_address_hash,
            'from_address' => {
              'address_hash' => addresses[0].address_hash,
              'address_type' => addresses[0].address_type,
              'label' => addresses[0].label
            },
            'to_address_hash' => transactions[1].to_address_hash,
            'to_address' => {
              'address_hash' => addresses[1].address_hash,
              'address_type' => addresses[1].address_type,
              'label' => addresses[1].label
            },
            'value' => transactions[1].value.as_json,
            'gas_used' => transactions[1].gas_used,
            'gas_limit' => transactions[1].gas_limit,
            'gas_unit_price' => transactions[1].gas_unit_price.as_json,
            'gas_ratio' => transactions[1].gas_ratio,
            'gas_fee' => transactions[1].gas_fee,
            'transaction_method_action' => {
              'contract' => {
                'address_hash' => transactions[1].transaction_method_action.contract.address_hash,
                'address_type' => transactions[1].transaction_method_action.contract.address_type,
                'label' => transactions[1].transaction_method_action.contract.label
              },
              'name' => transactions[1].transaction_method_action.name,
              'parameters' => [{
                'index' => transactions[1].transaction_method_action.parameters[0].index,
                'name' => transactions[1].transaction_method_action.parameters[0].name,
                'parameter_type' => transactions[1].transaction_method_action.parameters[0].parameter_type,
                'raw_type' => transactions[1].transaction_method_action.parameters[0].raw_type,
                'raw_value' => transactions[1].transaction_method_action.parameters[0].raw_value,
                'decimal_value' => transactions[1].transaction_method_action.parameters[0].decimal_value.as_json,
                'addresses' => []
              }]
            },
            'transaction_method_logs' => []
          )
        end
      end

      context 'list empty' do
        let(:transactions) do
          create_list :block_transaction, 5
          transactions = [
            create(:block_transaction, datetime: DateTime.new(2020, 5, 6, 11, 22, 33)),
            create(:block_transaction_with_action,
                   status: :pending, datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
                   from_address_hash: addresses[0].address_hash, to_address_hash: addresses[1].address_hash)
          ]
          create_list :block_transaction, 5

          transactions
        end

        before { get '/block_transactions', params: { status: 'pending' } }

        it { should have_http_status :ok }

        it { expect(body).to eq '[]' }
      end
    end

    context 'pending' do
      context 'list not empty' do
        let(:addresses) { create_list :address, 2 }
        let(:transactions) do
          create_list :block_transaction, 5
          transactions = [
            create(:block_transaction, datetime: DateTime.new(2020, 5, 6, 11, 22, 33)),
            create(:block_transaction_with_action,
                   status: :pending, datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
                   from_address_hash: addresses[0].address_hash, to_address_hash: addresses[1].address_hash)
          ]
          create_list :block_transaction, 5

          transactions
        end
        let(:json) { JSON.parse(body) }

        before do
          transactions

          get '/block_transactions', params: { status: 'pending', items: 5 }
        end

        it { is_expected.to have_http_status :ok }

        it do
          expect(headers).to match(hash_including(
                                     'Current-Page' => '1',
                                     'Page-Items' => '5',
                                     'Total-Pages' => '3',
                                     'Total-Count' => '12'
                                   ))
        end

        it { expect(json).to have_attributes count: 5 }

        it { expect(json[0]['transaction_hash']).to eq transactions[1].transaction_hash }
        it { expect(json[1]['transaction_hash']).to eq transactions[0].transaction_hash }

        it do
          expect(json[0]).to match(
            'transaction_hash' => transactions[1].transaction_hash,
            'status' => transactions[1].status,
            'datetime' => transactions[1].datetime.as_json,
            'block_number' => transactions[1].block_number,
            'from_address_hash' => transactions[1].from_address_hash,
            'from_address' => {
              'address_hash' => addresses[0].address_hash,
              'address_type' => addresses[0].address_type,
              'label' => addresses[0].label
            },
            'to_address_hash' => transactions[1].to_address_hash,
            'to_address' => {
              'address_hash' => addresses[1].address_hash,
              'address_type' => addresses[1].address_type,
              'label' => addresses[1].label
            },
            'value' => transactions[1].value.as_json,
            'gas_used' => transactions[1].gas_used,
            'gas_limit' => transactions[1].gas_limit,
            'gas_unit_price' => transactions[1].gas_unit_price.as_json,
            'gas_ratio' => transactions[1].gas_ratio,
            'gas_fee' => transactions[1].gas_fee,
            'transaction_method_action' => {
              'contract' => {
                'address_hash' => transactions[1].transaction_method_action.contract.address_hash,
                'address_type' => transactions[1].transaction_method_action.contract.address_type,
                'label' => transactions[1].transaction_method_action.contract.label
              },
              'name' => transactions[1].transaction_method_action.name,
              'parameters' => [{
                'index' => transactions[1].transaction_method_action.parameters[0].index,
                'name' => transactions[1].transaction_method_action.parameters[0].name,
                'parameter_type' => transactions[1].transaction_method_action.parameters[0].parameter_type,
                'raw_type' => transactions[1].transaction_method_action.parameters[0].raw_type,
                'raw_value' => transactions[1].transaction_method_action.parameters[0].raw_value,
                'decimal_value' => transactions[1].transaction_method_action.parameters[0].decimal_value.as_json,
                'addresses' => []
              }]
            },
            'transaction_method_logs' => []
          )
        end
      end

      context 'list empty' do
        let(:transactions) do
          create_list :block_transaction, 5
          transactions = [
            create(:block_transaction, datetime: DateTime.new(2020, 5, 6, 11, 22, 33)),
            create(:block_transaction_with_action,
                   status: :pending, datetime: DateTime.new(2020, 6, 7, 11, 22, 33),
                   from_address_hash: addresses[0].address_hash, to_address_hash: addresses[1].address_hash)
          ]
          create_list :block_transaction, 5

          transactions
        end

        before { get '/block_transactions', params: { status: 'pending' } }

        it { should have_http_status :ok }

        it { expect(body).to eq '[]' }
      end
    end

    context 'mined' do
      context 'list not empty' do
        let(:addresses) { create_list :address, 2 }
        let(:transactions) do
          [
            create(:block_transaction_mined, datetime: DateTime.new(2020, 6, 7, 11, 22, 33)),
            create(:block_transaction_mined),
            create(:block_transaction_mined, datetime: DateTime.new(2020, 5, 6, 11, 22, 33))
          ]
        end
        let(:json) { JSON.parse(body) }

        before do
          transactions

          get '/block_transactions', params: { status: 'mined' }
        end

        it { is_expected.to have_http_status :ok }

        it { expect(json).to have_attributes count: 3 }

        it { expect(json[0]['transaction_hash']).to eq transactions[1].transaction_hash }
        it { expect(json[1]['transaction_hash']).to eq transactions[2].transaction_hash }
        it { expect(json[2]['transaction_hash']).to eq transactions[0].transaction_hash }

        it do
          expect(json[0]).to match(
            'transaction_hash' => transactions[1].transaction_hash
          )
        end
      end

      context 'list empty' do
        before do
          create :block_transaction, status: :pending
          create :block_transaction, status: :validated
          create :block_transaction, status: :cancelled

          get '/block_transactions', params: { status: 'mined' }
        end

        it { should have_http_status :ok }

        it { expect(body).to eq '[]' }
      end
    end
  end

  describe 'POST #save' do
    subject { response }

    context 'when ETH server' do
      let(:headers) { user_auth_headers(:eth_server) }

      context 'transaction' do
        let(:token) { create :contract_token, address_hash: '0x0A00000000000000000000000000000000000222' }
        let(:params) do
          {
            block_transaction: {
              transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
              status: 'validated',
              block_number: 1000,
              datetime: '2020-04-05T11:22:33.000Z',
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: '1000000000000000000',
              gas_limit: 1000,
              gas_unit_price: '500',
              gas_used: 900,
              transaction_method_action_attributes:
                {
                  name: 'approve',
                  contract_hash: '0x0A00000000000000000000000000000000000222',
                  parameters_attributes: [
                    {
                      index: 0,
                      name: 'input1',
                      raw_type: 'address',
                      raw_value: '0x0A00000000000000000000000000000000000333',
                      addresses_attributes: [{
                        index: 0,
                        address_hash: '0x0A00000000000000000000000000000000000333'
                      }]
                    },
                    {
                      index: 1,
                      name: 'input2',
                      raw_type: 'address[]',
                      raw_value:
                      '["0x0A00000000000000000000000000000000000444","0x0A00000000000000000000000000000000000555"]',
                      addresses_attributes: [
                        { index: 0, address_hash: '0x0A00000000000000000000000000000000000444' },
                        { index: 1, address_hash: '0x0A00000000000000000000000000000000000555' }
                      ]
                    }
                  ]
                },
              transaction_method_logs_attributes: [
                {
                  index: 0,
                  name: 'Approval',
                  contract_hash: '0x0A00000000000000000000000000000000000222',
                  parameters_attributes: [
                    {
                      index: 0,
                      name: 'input1',
                      raw_type: 'address',
                      raw_value: '0x0A00000000000000000000000000000000000333',
                      addresses_attributes: [{
                        index: 0,
                        address_hash: '0x0A00000000000000000000000000000000000333'
                      }]
                    }
                  ]
                }
              ],
              logs_attributes: [{ log_type: 'error', message: 'Error.' }]
            }
          }
        end

        context 'create' do
          let(:block_transaction) { BlockTransaction.last }

          before do
            token
            post '/block_transactions', params: params, headers: headers
          end

          it { is_expected.to have_http_status :created }

          it { expect(body).to be_empty }

          it do
            expect(block_transaction).to have_attributes(
              transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
              status: 'validated',
              block_number: 1000,
              datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: 1_000_000_000_000_000_000.0,
              gas_limit: 1000,
              gas_unit_price: 500.0,
              gas_used: 900
            )
          end

          it { expect(block_transaction.transaction_method_action).to be }
          it { expect(block_transaction.transaction_method_logs).to have_attributes count: 1 }
          it { expect(block_transaction.transaction_actions).to have_attributes count: 1 }
          it { expect(block_transaction.logs).to have_attributes count: 1 }
        end

        context 'update' do
          let(:block_transaction) do
            create :block_transaction,
                   transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111'
          end

          before do
            token
            block_transaction

            post '/block_transactions', params: params, headers: headers
          end

          it { is_expected.to have_http_status :ok }

          it { expect(body).to be_empty }

          it do
            expect(block_transaction.reload).to have_attributes(
              id: block_transaction.id,
              status: 'validated',
              block_number: 1000,
              datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: 1_000_000_000_000_000_000.0,
              gas_limit: 1000,
              gas_unit_price: 500.0,
              gas_used: 900
            )
          end

          it { expect(block_transaction.reload.transaction_method_action).to be }
          it { expect(block_transaction.reload.transaction_method_logs).to have_attributes count: 1 }
          it { expect(block_transaction.reload.transaction_actions).to have_attributes count: 1 }
          it { expect(block_transaction.logs).to have_attributes count: 1 }
        end
      end

      context 'transactions' do
        let(:token) { create :contract_token, address_hash: '0x0A00000000000000000000000000000000000222' }
        let(:params) do
          {
            block_transactions: [{
              transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
              status: 'validated',
              block_number: 1000,
              datetime: '2020-04-05T11:22:33.000Z',
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: '1000000000000000000',
              gas_limit: 1000,
              gas_unit_price: '500',
              gas_used: 900,
              transaction_method_action_attributes:
                {
                  name: 'approve',
                  contract_hash: '0x0A00000000000000000000000000000000000222',
                  parameters_attributes: [
                    {
                      index: 0,
                      name: 'input1',
                      raw_type: 'address',
                      raw_value: '0x0A00000000000000000000000000000000000333',
                      addresses_attributes: [{
                        index: 0,
                        address_hash: '0x0A00000000000000000000000000000000000333'
                      }]
                    },
                    {
                      index: 1,
                      name: 'input2',
                      raw_type: 'address[]',
                      raw_value:
                      '["0x0A00000000000000000000000000000000000444","0x0A00000000000000000000000000000000000555"]',
                      addresses_attributes: [
                        { index: 0, address_hash: '0x0A00000000000000000000000000000000000444' },
                        { index: 1, address_hash: '0x0A00000000000000000000000000000000000555' }
                      ]
                    }
                  ]
                },
              transaction_method_logs_attributes: [
                {
                  index: 0,
                  name: 'Approval',
                  contract_hash: '0x0A00000000000000000000000000000000000222',
                  parameters_attributes: [
                    {
                      index: 0,
                      name: 'input1',
                      raw_type: 'address',
                      raw_value: '0x0A00000000000000000000000000000000000333',
                      addresses_attributes: [{
                        index: 0,
                        address_hash: '0x0A00000000000000000000000000000000000333'
                      }]
                    }
                  ]
                }
              ],
              logs_attributes: [{ log_type: 'error', message: 'Error.' }]
            }]
          }
        end

        context 'create' do
          let(:block_transaction) { BlockTransaction.last }

          before do
            token
            post '/block_transactions', params: params, headers: headers
          end

          it { is_expected.to have_http_status :ok }

          it { expect(body).to be_empty }

          it do
            expect(block_transaction).to have_attributes(
              transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
              status: 'validated',
              block_number: 1000,
              datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: 1_000_000_000_000_000_000.0,
              gas_limit: 1000,
              gas_unit_price: 500.0,
              gas_used: 900
            )
          end

          it { expect(block_transaction.transaction_method_action).to be }
          it { expect(block_transaction.transaction_method_logs).to have_attributes count: 1 }
          it { expect(block_transaction.transaction_actions).to have_attributes count: 1 }
          it { expect(block_transaction.logs).to have_attributes count: 1 }
        end

        context 'update' do
          let(:block_transaction) do
            create :block_transaction,
                   transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111'
          end

          before do
            token
            block_transaction
            post '/block_transactions', params: params, headers: headers
          end

          it { is_expected.to have_http_status :ok }

          it { expect(body).to be_empty }

          it do
            expect(block_transaction.reload).to have_attributes(
              id: block_transaction.id,
              status: 'validated',
              block_number: 1000,
              datetime: DateTime.new(2020, 4, 5, 11, 22, 33),
              from_address_hash: '0x0A00000000000000000000000000000000000111',
              to_address_hash: '0x0A00000000000000000000000000000000000222',
              value: 1_000_000_000_000_000_000.0,
              gas_limit: 1000,
              gas_unit_price: 500.0,
              gas_used: 900
            )
          end

          it { expect(block_transaction.reload.transaction_method_action).to be }
          it { expect(block_transaction.reload.transaction_method_logs).to have_attributes count: 1 }
          it { expect(block_transaction.reload.transaction_actions).to have_attributes count: 1 }
          it { expect(block_transaction.logs).to have_attributes count: 1 }
        end
      end
    end

    context 'when not ETH server' do
      let(:headers) { user_auth_headers(:user) }
      let(:params) do
        {
          block_transaction: {
            transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
            status: 'validated',
            block_number: 1000,
            datetime: '2020-04-05T11:22:33.000Z',
            from_address_hash: '0x0A00000000000000000000000000000000000111',
            to_address_hash: '0x0A00000000000000000000000000000000000222',
            value: '1000000000000000000',
            gas_limit: 1000,
            gas_unit_price: '500',
            gas_used: 900
          }
        }
      end

      before { post '/block_transactions', params: params, headers: headers }

      it { is_expected.to have_http_status :unauthorized }

      it { expect(body).to be_empty }

      it { expect(BlockTransaction.all).to be_empty }
    end

    context 'when unauthentified' do
      let(:params) do
        {
          block_transaction: {
            transaction_hash: '0x0A00000000000000000000000000000000000000000000000000000000000111',
            status: 'validated',
            block_number: 1000,
            datetime: '2020-04-05T11:22:33.000Z',
            from_address_hash: '0x0A00000000000000000000000000000000000111',
            to_address_hash: '0x0A00000000000000000000000000000000000222',
            value: '1000000000000000000',
            gas_limit: 1000,
            gas_unit_price: '500',
            gas_used: 900
          }
        }
      end

      before { post '/block_transactions', params: params }

      it { is_expected.to have_http_status :unauthorized }

      it { expect(body).to be_empty }

      it { expect(BlockTransaction.all).to be_empty }
    end
  end
end
