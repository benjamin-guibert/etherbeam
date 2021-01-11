# frozen_string_literal: true

FactoryBot.define do
  sequence :hash do |n|
    "0x#{n.to_s.rjust(64, '0')}"
  end

  sequence :address do |n|
    "0x#{n.to_s.rjust(40, '0')}"
  end
end
