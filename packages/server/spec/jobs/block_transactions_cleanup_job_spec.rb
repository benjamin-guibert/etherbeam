# frozen_string_literal: true

require 'rails_helper'

describe BlockTransactionsCleanupJob, type: :job do
  ActiveJob::Base.queue_adapter = :test

  before do
    create :block_transaction, datetime: 3.weeks.ago
    create :block_transaction, datetime: 2.days.ago
    create :block_transaction, datetime: 2.hours.ago
  end

  describe '#perform_now' do
    before { BlockTransactionsCleanupJob.perform_now }

    subject { BlockTransaction.trashable }

    it { is_expected.to be_empty }
  end
end
