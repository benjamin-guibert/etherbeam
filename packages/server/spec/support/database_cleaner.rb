# frozen_string_literal: true

require 'database_cleaner'

RSpec.configure do |config|
  config.before(:context) do
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.start

    Rails.application.load_seed
  end

  config.after(:context) do
    DatabaseCleaner.clean
  end
end
