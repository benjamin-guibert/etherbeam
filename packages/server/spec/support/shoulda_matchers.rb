# frozen_string_literal: true

require 'database_cleaner'

RSpec.configure do
  Shoulda::Matchers.configure do |shoulda_config|
    shoulda_config.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
end
