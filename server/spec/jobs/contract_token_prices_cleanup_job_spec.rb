# frozen_string_literal: true

require 'rails_helper'

describe ContractTokenPricesCleanupJob, type: :job do
  ActiveJob::Base.queue_adapter = :test

  before do
    create :contract_token_price, datetime: 3.weeks.ago
    create :contract_token_price, datetime: 3.weeks.ago
    create :contract_token_price, datetime: 2.days.ago
    create :contract_token_price, datetime: 2.days.ago
    create :contract_token_price, datetime: 1.day.ago
  end

  describe '#perform_now' do
    before { BlockTransactionsCleanupJob.perform_now }

    subject { BlockTransaction.trashable }

    it { is_expected.to be_empty }
  end
end
