# frozen_string_literal: true

class SessionsController < DeviseTokenAuth::SessionsController
  include UsersConcern

  protected

  def render_create_success
    render_user
  end
end
