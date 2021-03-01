# frozen_string_literal: true

namespace :db do
  desc 'Checks to see if the database exists'
  task exists: :environment do
    ActiveRecord::Base.connection
  rescue ActiveRecord::NoDatabaseError
    puts "Database '#{ActiveRecord::Base.connection_config[:database]}' does not exist."
    exit 1
  else
    puts "Database '#{ActiveRecord::Base.connection_config[:database]}' exists."
    exit 0
  end
end
