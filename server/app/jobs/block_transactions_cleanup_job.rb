# frozen_string_literal: true

class BlockTransactionsCleanupJob < ApplicationJob
  queue_as :low_priority

  def perform
    BlockTransaction.trashable.destroy_all
  end
end
