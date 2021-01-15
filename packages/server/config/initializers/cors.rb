# frozen_string_literal: true

EXPOSED_HEADERS = %w[Current-Page Page-Items Total-Pages Total-Count].freeze
EXPOSED_METHODS = %i[get post patch put delete options].freeze

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', expose: EXPOSED_HEADERS, headers: :any, methods: EXPOSED_METHODS
  end
end
