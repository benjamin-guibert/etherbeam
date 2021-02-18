# frozen_string_literal: true

require 'rails_helper'

describe 'Session', type: :request do
  describe 'POST /auth/login' do
    let(:user) { create :user }

    describe 'when valid' do
      let(:params) do
        {
          email: user.email,
          password: 'password'
        }
      end

      before do
        post '/auth/login', params: params
        user.reload
      end

      it do
        expect(user).to have_attributes(
          sign_in_count: 1,
          current_sign_in_ip: '127.0.0.1',
          last_sign_in_ip: '127.0.0.1'
        )
        expect(user.current_sign_in_at).to be
        expect(user.last_sign_in_at).to be
      end

      it { expect(response).to have_http_status :ok }

      it do
        expect(JSON.parse(response.body)).to match(
          { 'data' => {
            'id' => user.id,
            'email' => user.email,
            'provider' => user.provider,
            'uid' => user.uid,
            'user_type' => user.user_type,
            'name' => user.name,
            'allow_password_change' => user.allow_password_change
          } }
        )
      end
    end

    describe 'when email invalid' do
      let(:params) do
        {
          email: 'wrong@email.com',
          password: 'password'
        }
      end

      before do
        post '/auth/login', params: params
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

      it { expect(response).to have_http_status :unauthorized }

      it do
        body = JSON.parse(response.body)
        expect(body['success']).to be_falsy
        expect(body['errors']).not_to be_empty
      end
    end

    describe 'when password invalid' do
      let(:params) do
        {
          email: user.email,
          password: 'wrong'
        }
      end

      before do
        post '/auth/login', params: params
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

      it { expect(response).to have_http_status :unauthorized }

      it do
        body = JSON.parse(response.body)
        expect(body['success']).to be_falsy
        expect(body['errors']).not_to be_empty
      end
    end
  end
end
