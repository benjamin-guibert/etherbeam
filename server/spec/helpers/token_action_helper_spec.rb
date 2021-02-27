# frozen_string_literal: true

require 'rails_helper'

describe TokenActionHelper, type: :helper do
  describe '#parse_transaction_token_actions' do
    context 'when approval' do
      let(:token) { create :contract_token }
      let(:wallet) { create :address, :wallet }
      let(:block_transaction) do
        create :block_transaction_mined,
               status: :validated,
               from_address_hash: wallet.address_hash,
               to_address_hash: token.address_hash
      end
      let(:transaction_method) do
        create :transaction_method, block_transaction: block_transaction, contract: token, name: 'approve'
      end

      before do
        transaction_method
        block_transaction.reload
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 1 }
      it { expect(block_transaction.logs.count).to eq 0 }
      it do
        expect(block_transaction.transaction_actions.first).to have_attributes(
          block_transaction_id: block_transaction.id,
          holder_address_hash: wallet.address_hash,
          holder_address_id: wallet.id,
          index: 0,
          action_type: 'approval',
          to_address_hash: token.address_hash,
          to_address_id: token.id
        )
      end
    end

    context 'when transfer' do
      let(:token) { create :contract_token }
      let(:wallet) { create :address, :wallet }
      let(:other_wallet) { create :address, :wallet }
      let(:block_transaction) do
        block_transaction = create :block_transaction_mined,
                                   status: :validated,
                                   from_address_hash: wallet.address_hash,
                                   to_address_hash: token.address_hash
        transaction_method = create :transaction_method, block_transaction: block_transaction, contract: token,
                                                         name: 'transfer'
        address_parameter = create :transaction_method_parameter, transaction_method: transaction_method, index: 0,
                                                                  name: 'dst', parameter_type: :address
        create :transaction_method_parameter_address, parameter: address_parameter, index: 0,
                                                      address_hash: other_wallet.address_hash
        create :transaction_method_parameter, transaction_method: transaction_method, name: 'wad', index: 1,
                                              parameter_type: :unsigned_integer, decimal_value: 1000

        block_transaction.reload
      end

      before do
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 1 }
      it { expect(block_transaction.logs.count).to eq 0 }
      it do
        expect(block_transaction.transaction_actions.first).to have_attributes(
          block_transaction_id: block_transaction.id,
          holder_address_hash: wallet.address_hash,
          holder_address_id: wallet.id,
          index: 0,
          action_type: 'transfer',
          from_address_hash: token.address_hash,
          from_address_id: token.id,
          from_amount: block_transaction.transaction_method_action.parameters.last.decimal_value,
          to_address_hash: other_wallet.address_hash,
          to_address_id: other_wallet.id
        )
      end
    end

    context 'when swap' do
      let(:token) { create :contract_token }
      let(:other_token) { create :contract_token }
      let(:contract) { create :contract }
      let(:wallet) { create :address, :wallet }
      let(:other_contract) { create :contract }
      let(:block_transaction) do
        block_transaction = create :block_transaction_mined,
                                   status: :validated,
                                   from_address_hash: wallet.address_hash,
                                   to_address_hash: token.address_hash
        transaction_method = create :transaction_method, block_transaction: block_transaction, contract: contract,
                                                         name: 'swap'
        path_parameter = create :transaction_method_parameter, transaction_method: transaction_method, index: 0,
                                                               name: 'path', parameter_type: :address
        create :transaction_method_parameter_address, parameter: path_parameter, index: 0,
                                                      address_hash: other_token.address_hash
        create :transaction_method_parameter_address, parameter: path_parameter, index: 1,
                                                      address_hash: token.address_hash

        log_method1 = create :transaction_method, block_transaction: block_transaction, contract: other_token,
                                                  index: 0, name: 'Transfer'
        from_parameter = create :transaction_method_parameter, transaction_method: log_method1, index: 0, name: 'from',
                                                               parameter_type: 'address'
        create :transaction_method_parameter_address, parameter: from_parameter, index: 0,
                                                      address_hash: wallet.address_hash
        to_parameter = create :transaction_method_parameter, transaction_method: log_method1, index: 1, name: 'to',
                                                             parameter_type: 'address'
        create :transaction_method_parameter_address, parameter: to_parameter, index: 0,
                                                      address_hash: other_contract.address_hash
        create :transaction_method_parameter, transaction_method: log_method1, index: 2, name: 'amount',
                                              parameter_type: :unsigned_integer, decimal_value: 1000

        log_method2 = create :transaction_method, block_transaction: block_transaction, contract: token,
                                                  index: 1, name: 'Transfer'
        from_parameter = create :transaction_method_parameter, transaction_method: log_method2, index: 0, name: 'from',
                                                               parameter_type: 'address'
        create :transaction_method_parameter_address, parameter: from_parameter, index: 0,
                                                      address_hash: other_contract.address_hash
        to_parameter = create :transaction_method_parameter, transaction_method: log_method2, index: 1, name: 'to',
                                                             parameter_type: 'address'
        create :transaction_method_parameter_address, parameter: to_parameter, index: 0,
                                                      address_hash: wallet.address_hash
        create :transaction_method_parameter, transaction_method: log_method2, index: 2, name: 'amount',
                                              parameter_type: :unsigned_integer, decimal_value: 2000

        block_transaction.reload
      end

      before do
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 1 }
      it { expect(block_transaction.logs.count).to eq 0 }
      it do
        expect(block_transaction.transaction_actions.first).to have_attributes(
          block_transaction_id: block_transaction.id,
          holder_address_hash: wallet.address_hash,
          holder_address_id: wallet.id,
          index: 0,
          action_type: 'swap',
          from_address_hash: other_token.address_hash,
          from_address_id: other_token.id,
          from_amount: block_transaction.transaction_method_logs[0].parameters.last.decimal_value,
          to_address_hash: token.address_hash,
          to_address_id: token.id,
          to_amount: block_transaction.transaction_method_logs[1].parameters.last.decimal_value
        )
      end
    end

    context 'when unknown' do
      let(:block_transaction) do
        block_transaction = create :block_transaction_mined, status: :validated
        create :transaction_method, block_transaction: block_transaction

        block_transaction.reload
      end

      before do
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 0 }
      it { expect(block_transaction.logs.count).to eq 1 }
    end

    context 'when canceled' do
      let(:block_transaction) { create :block_transaction_with_action, status: :cancelled }

      before do
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 0 }
      it { expect(block_transaction.logs.count).to eq 0 }
    end

    context 'when no action' do
      let(:block_transaction) { create :block_transaction_mined, status: :validated }

      before do
        parse_transaction_token_actions block_transaction
        block_transaction.reload
      end

      it { expect(block_transaction.transaction_actions.count).to eq 0 }
      it { expect(block_transaction.logs.count).to eq 0 }
    end
  end
end
