# frozen_string_literal: true

class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
  include UsersConcern

  protected

  def render_validate_token_success
    render_user
  end
end
