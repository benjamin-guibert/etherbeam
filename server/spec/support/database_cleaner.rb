# frozen_string_literal: true

require 'database_cleaner'

DatabaseCleaner.strategy = :truncation

RSpec.configure do |config|
  config.before(:each) do
    DatabaseCleaner.clean

    Rails.application.load_seed
  end
end
