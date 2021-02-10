# frozen_string_literal: true

class AddTokenChartPair < ActiveRecord::Migration[6.0]
  def change
    add_column :addresses, :chart_pair, :string
  end
end
