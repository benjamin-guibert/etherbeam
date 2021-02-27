# frozen_string_literal: true

class ContractTokenPricesCleanupJob < ApplicationJob
  queue_as :low_priority

  def perform
    ContractTokenPrices.trashable.destroy_all
  end
end
