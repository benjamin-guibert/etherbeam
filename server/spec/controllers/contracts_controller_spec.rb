# frozen_string_literal: true

require 'rails_helper'

describe ContractsController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  describe 'GET #index' do
    it { is_expected.to route(:get, '/contracts').to(controller: :contracts, action: :index) }

    let(:contract) { create :contract }
    let(:json) { JSON.parse(response.body) }

    context 'when authentified' do
      before do
        authenticate_user create :user
        contract

        get :index
      end

      it { is_expected.to respond_with :ok }

      it { expect(json).to have_attributes count: 4 }

      it do
        expect(json[3]).to match(
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

    context 'when unauthentified' do
      before do
        contract

        get :index
      end

      it { should_render_unauthorized }
    end
  end
end
