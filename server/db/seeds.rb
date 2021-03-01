# frozen_string_literal: true

load('db/seeds/common.rb')
load(Rails.root.join('db/seeds/environments', "#{Rails.env.downcase}.rb"))
