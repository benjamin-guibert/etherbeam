# frozen_string_literal: true

module Loggable
  extend ActiveSupport::Concern

  included do
    has_many :logs, -> { order(updated_at: :desc) }, class_name: 'Log', dependent: :destroy

    accepts_nested_attributes_for :logs, allow_destroy: false
  end
end
