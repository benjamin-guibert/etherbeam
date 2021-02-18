# frozen_string_literal: true

class CreateTables < ActiveRecord::Migration[6.0] # rubocop:disable Metrics/ClassLength
  def change
    create_addresses_table
    create_contract_token_prices_table
    create_block_transactions_table
    create_transaction_methods_table
    create_transaction_method_parameters_table
    create_transaction_method_parameter_addresses_table
    create_transaction_actions_table
    create_logs_table
  end

  private

  def create_addresses_table
    create_table :addresses do |t|
      t.string :sanitized_hash, null: false, index: { unique: true }
      t.string :address_hash, null: false
      t.integer :address_type, null: false, default: 0
      t.string :label, null: false
      t.string :abi
      t.string :name
      t.string :symbol
      t.integer :decimals
      t.string :chart_pair
      t.string :website
      t.string :whitepaper
      t.string :github
      t.string :linkedin
      t.string :facebook
      t.string :reddit
      t.string :twitter
      t.string :telegram
      t.string :discord
      t.timestamps
    end
  end

  def create_contract_token_prices_table
    create_table :contract_token_prices do |t|
      t.belongs_to :contract_token, foreign_key: { to_table: :addresses }, null: false
      t.datetime :datetime, null: false
      t.decimal :price, null: false
    end
  end

  def create_block_transactions_table
    create_table :block_transactions do |t|
      t.string :sanitized_hash, null: false, index: { unique: true }
      t.string :transaction_hash, null: false
      t.integer :status, null: false, default: 0
      t.datetime :datetime, null: false
      t.integer :block_number
      t.string :from_address_hash
      t.belongs_to :from_address, foreign_key: { to_table: :addresses }
      t.string :to_address_hash
      t.belongs_to :to_address, foreign_key: { to_table: :addresses }
      t.decimal :value
      t.integer :gas_used
      t.integer :gas_limit
      t.decimal :gas_unit_price
      t.timestamps
    end
  end

  def create_transaction_methods_table
    create_table :transaction_methods do |t|
      t.belongs_to :block_transaction, foreign_key: { to_table: :block_transactions }, null: false
      t.string :contract_hash
      t.belongs_to :contract, foreign_key: { to_table: :addresses }, null: false
      t.integer :index
      t.string :name, null: false
    end
  end

  def create_transaction_method_parameters_table
    create_table :transaction_method_parameters do |t|
      t.belongs_to :transaction_method, foreign_key: { to_table: :transaction_methods }, null: false
      t.integer :index, null: false, default: 0
      t.string :name
      t.integer :parameter_type
      t.string :raw_type
      t.string :raw_value
      t.decimal :decimal_value
    end
  end

  def create_transaction_method_parameter_addresses_table
    create_table :transaction_method_parameter_addresses do |t|
      t.belongs_to  :parameter,
                    foreign_key: { to_table: :transaction_method_parameters },
                    null: false
      t.integer :index, null: false, default: 0
      t.string :sanitized_hash
      t.string :address_hash
      t.belongs_to :address, foreign_key: { to_table: :addresses }
    end
  end

  def create_transaction_actions_table
    create_table :transaction_actions do |t|
      t.belongs_to :block_transaction, foreign_key: { to_table: :block_transactions }, null: false
      t.integer :action_type, null: false, default: 0
      t.integer :index, null: false, default: 0
      t.string :holder_address_hash, null: false
      t.belongs_to :holder_address, foreign_key: { to_table: :addresses }
      t.string :from_address_hash
      t.belongs_to :from_address, foreign_key: { to_table: :addresses }
      t.decimal :from_amount
      t.string :to_address_hash
      t.belongs_to :to_address, foreign_key: { to_table: :addresses }
      t.decimal :to_amount
    end
  end

  def create_logs_table
    create_table :logs do |t|
      t.integer :log_type, null: false, default: 0
      t.belongs_to :address, foreign_key: { table_to: :addresses }
      t.belongs_to :block_transaction, foreign_key: { table_to: :block_transactions }
      t.string :message, null: false
      t.timestamps
    end
  end
end
