# frozen_string_literal: true

require 'rails_helper'

module Helpers
  module Models
    module ValidationHelper
      def validates_hash(subject, value)
        expect(subject).to allow_value('0x0aBcDeF000000000000000000000000000000000000000000000000123456789').for value
        expect(subject).not_to allow_value('test').for value
      end

      def validates_address(subject, value)
        expect(subject).to allow_value('0x0aBcDeF000000000000000000000000123456789').for value
        expect(subject).not_to allow_value('test').for value
      end
    end
  end
end
