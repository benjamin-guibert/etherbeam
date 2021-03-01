# frozen_string_literal: true

require 'rails_helper'

describe SessionsController, type: :controller do
  include Helpers::Controllers::AuthentificationHelper

  before { request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'POST /auth/sign_in' do
    it { is_expected.to route(:post, '/auth/sign_in').to(controller: :sessions, action: :create) }

    let(:user) { create :user }
    let(:json) { JSON.parse(response.body) }

    context 'when valid' do
      let(:params) do
        {
          email: user.email,
          password: 'password'
        }
      end

      before do
        post :create, params: params

        user.reload
      end

      it do
        expect(user).to have_attributes(
          sign_in_count: 1,
          current_sign_in_ip: '0.0.0.0',
          last_sign_in_ip: '0.0.0.0'
        )
        expect(user.current_sign_in_at).to be
        expect(user.last_sign_in_at).to be
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

    context 'when email invalid' do
      let(:params) do
        {
          email: 'wrong@email.com',
          password: 'password'
        }
      end

      before do
        post :create, params: params

        user.reload
      end

      it do
        expect(user).to have_attributes(
          sign_in_count: 0,
          current_sign_in_at: nil,
          last_sign_in_at: nil,
          current_sign_in_ip: nil,
          last_sign_in_ip: nil
        )
      end

      it { should_render_unauthorized }
    end

    context 'when password invalid' do
      let(:params) do
        {
          email: user.email,
          password: 'wrong'
        }
      end

      before do
        post :create, params: params

        user.reload
      end

      it do
        expect(user).to have_attributes(
          sign_in_count: 0,
          current_sign_in_at: nil,
          last_sign_in_at: nil,
          current_sign_in_ip: nil,
          last_sign_in_ip: nil
        )
      end

      it { should_render_unauthorized }
    end
  end

  describe 'DELETE /auth/sign_out' do
    let(:json) { JSON.parse(response.body) }

    it { is_expected.to route(:delete, '/auth/sign_out').to(controller: :sessions, action: :destroy) }

    context 'when authentified' do
      before do
        authenticate_user create :user

        delete :destroy
      end

      it { is_expected.to respond_with :ok }

      it do
        expect(response.headers['token-type']).not_to be
        expect(response.headers['client']).not_to be
        expect(response.headers['uid']).not_to be
        expect(response.headers['access-token']).not_to be
        expect(response.headers['expiry']).not_to be
      end
    end

    context 'when unauthentified' do
      before do
        delete :destroy
      end

      it { is_expected.to respond_with :not_found }

      it { expect(json['errors']).to have_attributes count: 1 }
    end
  end
end
