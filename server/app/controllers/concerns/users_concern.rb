# frozen_string_literal: true

module UsersConcern
  def render_user(status = :ok)
    render  json: @resource,
            root: false,
            status: status,
            only: %i[email name user_type]
  end
end
