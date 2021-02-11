# frozen_string_literal: true

require 'rails_helper'

describe 'Schedule' do
  let(:schedule) { Whenever::Test::Schedule.new(file: 'config/schedule.rb') }

  describe 'BlockTransactionsCleanupJob' do
    subject { schedule.jobs[:runner][0] }

    it { expect(subject[:task]).to be 'BlockTransactionsCleanupJob.perform_now' }
    it { expect(subject[:every]).to eq [:day] }
  end
end
