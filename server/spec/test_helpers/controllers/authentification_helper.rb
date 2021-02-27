# frozen_string_literal: true

require 'rails_helper'

module Helpers
  module Controllers
    module AuthentificationHelper
      def authenticate_user(user)
        current_user = user
        request.headers.merge! current_user.create_new_auth_token
      end

      def should_render_unauthorized
        is_expected.to respond_with :unauthorized

        json = JSON.parse(response.body)
        expect(json['errors']).to have_attributes count: 1
      end
    end
  end
end
