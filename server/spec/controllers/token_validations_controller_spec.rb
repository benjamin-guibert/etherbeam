# frozen_string_literal: true

require 'rails_helper'

describe TokenValidationsController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  before { request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'GET /auth/validate_token' do
    it do
      is_expected.to route(:get, '/auth/validate_token').to(controller: :token_validations, action: :validate_token)
    end

    let(:user) { create :user }
    let(:json) { JSON.parse(response.body) }

    context 'when valid' do
      before do
        authenticate_user user

        get :validate_token
      end

      it { is_expected.to respond_with :ok }

      it do
        expect(response.headers['token-type']).to be
        expect(response.headers['client']).to be
        expect(response.headers['uid']).to be
        expect(response.headers['access-token']).to be
        expect(response.headers['expiry']).to be
      end

      it do
        expect(json).to match(
          {
            'name' => user.name,
            'email' => user.email,
            'user_type' => user.user_type
          }
        )
      end
    end

    context 'when invalid' do
      before do
        authenticate_user user
        old_token = request.headers['access-token']
        authenticate_user user
        request.headers['access-token'] = old_token

        get :validate_token
      end

      it { should_render_unauthorized }
    end

    context 'when unauthentified' do
      before { get :validate_token }

      it { should_render_unauthorized }
    end
  end
end
