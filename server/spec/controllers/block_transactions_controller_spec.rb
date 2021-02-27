# frozen_string_literal: true

require 'rails_helper'

describe BlockTransactionsController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  describe 'GET #index' do
    let(:json) { JSON.parse(response.body) }

    it do
      is_expected.to route(:get, 'block_transactions').to(
        controller: :block_transactions, action: :index
      )
    end

    context 'when authentified' do
      before { authenticate_user create :user }

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

          before do
            transactions

            get :index, params: { items: 5 }
          end

          it { is_expected.to respond_with :ok }

          it do
            expect(response.headers).to match(hash_including(
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

          before { get :index, params: { status: 'pending' } }

          it { should respond_with :ok }

          it { expect(response.body).to eq '[]' }
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

          before do
            transactions

            get :index, params: { status: 'pending', items: 5 }
          end

          it { is_expected.to respond_with :ok }

          it do
            expect(response.headers).to match(hash_including(
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

          before { get :index, params: { status: 'pending' } }

          it { should respond_with :ok }

          it { expect(response.body).to eq '[]' }
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

          before do
            transactions

            get :index, params: { status: 'mined' }
          end

          it { is_expected.to respond_with :ok }

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

            get :index, params: { status: 'mined' }
          end

          it { should respond_with :ok }

          it { expect(response.body).to eq '[]' }
        end
      end
    end

    context 'when unauthentified' do
      let(:transactions) { create_list :block_transaction, 5, status: :validated }

      before do
        transactions

        get :index, params: { items: 5 }
      end

      it { should_render_unauthorized }
    end
  end

  describe 'POST #save' do
    it do
      should route(:post, 'block_transactions')
        .to(
          controller: :block_transactions,
          action: :save
        )
    end

    let(:contract_token) { create :contract_token, address_hash: '0x0A00000000000000000000000000000000000222' }
    let(:transaction_params) do
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

    context 'when ETH server' do
      before { authenticate_user create :user, :eth_server }

      context 'transaction' do
        context 'create' do
          let(:block_transaction) { BlockTransaction.last }

          before do
            contract_token

            post :save, params: transaction_params
          end

          it { is_expected.to respond_with :created }

          it { expect(response.body).to be_empty }

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
            contract_token
            block_transaction

            post :save, params: transaction_params
          end

          it { is_expected.to respond_with :ok }

          it { expect(response.body).to be_empty }

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
        let(:transactions_params) do
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
            contract_token

            post :save, params: transactions_params
          end

          it { is_expected.to respond_with :ok }

          it { expect(response.body).to be_empty }

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
            contract_token
            block_transaction

            post :save, params: transactions_params
          end

          it { is_expected.to respond_with :ok }

          it { expect(response.body).to be_empty }

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

    context 'when user' do
      before do
        authenticate_user create :user

        post :save, params: transaction_params
      end

      it { should_render_unauthorized }

      it { expect(BlockTransaction.all).to have_attributes count: 0 }
    end

    context 'when administrator' do
      before do
        authenticate_user create :user, :administrator

        post :save, params: transaction_params
      end

      it { should_render_unauthorized }

      it { expect(BlockTransaction.all).to have_attributes count: 0 }
    end

    context 'when unauthentified' do
      before { post :save, params: transaction_params }

      it { should_render_unauthorized }

      it { expect(BlockTransaction.all).to have_attributes count: 0 }
    end
  end
end
