# frozen_string_literal: true

require 'rails_helper'

describe ContractsController, type: :controller do
  describe 'GET #index' do
    it { is_expected.to route(:get, '/contracts').to(controller: :contracts, action: :index) }

    let(:contract) { create :contract }
    let(:body) { JSON.parse(response.body) }

    before do
      contract
      get :index
    end

    it { is_expected.to respond_with :ok }

    it { expect(body).to have_attributes count: 3 }

    it do
      expect(body[2]).to match(
        {
          'sanitized_hash' => contract.sanitized_hash,
          'address_hash' => contract.address_hash,
          'address_type' => contract.address_type,
          'label' => contract.label,
          'abi' => contract.abi
        }
      )
    end
  end
end
