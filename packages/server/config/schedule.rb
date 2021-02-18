# frozen_string_literal: true

require 'rails'
require 'pathname'

ERROR_LOG_PATH = Pathname.new(__dir__).join('..', 'log', 'schedule_errors.log')

every :day do
  runner 'BlockTransactionsCleanupJob.perform_now', environment: Rails.env, output: { error: ERROR_LOG_PATH }
  runner 'ContractTokenPricesCleanupJob.perform_now', environment: Rails.env, output: { error: ERROR_LOG_PATH }
end
