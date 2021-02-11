# frozen_string_literal: true

every :day do
  runner 'BlockTransactionsCleanupJob.perform_now'
end
