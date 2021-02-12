# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_11_184140) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "sanitized_hash", null: false
    t.string "address_hash", null: false
    t.integer "address_type", default: 0, null: false
    t.string "label", null: false
    t.string "abi"
    t.string "name"
    t.string "symbol"
    t.integer "decimals"
    t.string "website"
    t.string "whitepaper"
    t.string "github"
    t.string "linkedin"
    t.string "facebook"
    t.string "reddit"
    t.string "twitter"
    t.string "telegram"
    t.string "discord"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "chart_pair"
    t.index ["sanitized_hash"], name: "index_addresses_on_sanitized_hash", unique: true
  end

  create_table "block_transactions", force: :cascade do |t|
    t.string "sanitized_hash", null: false
    t.string "transaction_hash", null: false
    t.integer "status", default: 0, null: false
    t.datetime "datetime", null: false
    t.integer "block_number"
    t.string "from_address_hash"
    t.bigint "from_address_id"
    t.string "to_address_hash"
    t.bigint "to_address_id"
    t.decimal "value"
    t.integer "gas_used"
    t.integer "gas_limit"
    t.decimal "gas_unit_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["from_address_id"], name: "index_block_transactions_on_from_address_id"
    t.index ["sanitized_hash"], name: "index_block_transactions_on_sanitized_hash", unique: true
    t.index ["to_address_id"], name: "index_block_transactions_on_to_address_id"
  end

  create_table "logs", force: :cascade do |t|
    t.integer "log_type", default: 0, null: false
    t.bigint "address_id"
    t.bigint "block_transaction_id"
    t.string "message", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_logs_on_address_id"
    t.index ["block_transaction_id"], name: "index_logs_on_block_transaction_id"
  end

  create_table "token_prices", force: :cascade do |t|
    t.bigint "token_id", null: false
    t.datetime "datetime", null: false
    t.decimal "price", null: false
    t.index ["token_id"], name: "index_token_prices_on_token_id"
  end

  create_table "transaction_actions", force: :cascade do |t|
    t.bigint "block_transaction_id", null: false
    t.integer "action_type", default: 0, null: false
    t.integer "index", default: 0, null: false
    t.string "holder_address_hash", null: false
    t.bigint "holder_address_id"
    t.string "from_address_hash"
    t.bigint "from_address_id"
    t.decimal "from_amount"
    t.string "to_address_hash"
    t.bigint "to_address_id"
    t.decimal "to_amount"
    t.index ["block_transaction_id"], name: "index_transaction_actions_on_block_transaction_id"
    t.index ["from_address_id"], name: "index_transaction_actions_on_from_address_id"
    t.index ["holder_address_id"], name: "index_transaction_actions_on_holder_address_id"
    t.index ["to_address_id"], name: "index_transaction_actions_on_to_address_id"
  end

  create_table "transaction_method_parameter_addresses", force: :cascade do |t|
    t.bigint "parameter_id", null: false
    t.integer "index", default: 0, null: false
    t.string "sanitized_hash"
    t.string "address_hash"
    t.bigint "address_id"
    t.index ["address_id"], name: "index_transaction_method_parameter_addresses_on_address_id"
    t.index ["parameter_id"], name: "index_transaction_method_parameter_addresses_on_parameter_id"
  end

  create_table "transaction_method_parameters", force: :cascade do |t|
    t.bigint "transaction_method_id", null: false
    t.integer "index", default: 0, null: false
    t.string "name"
    t.integer "parameter_type"
    t.string "raw_type"
    t.string "raw_value"
    t.decimal "decimal_value"
    t.index ["transaction_method_id"], name: "index_transaction_method_parameters_on_transaction_method_id"
  end

  create_table "transaction_methods", force: :cascade do |t|
    t.bigint "block_transaction_id", null: false
    t.string "contract_hash"
    t.bigint "contract_id", null: false
    t.integer "index"
    t.string "name", null: false
    t.index ["block_transaction_id"], name: "index_transaction_methods_on_block_transaction_id"
    t.index ["contract_id"], name: "index_transaction_methods_on_contract_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.integer "user_type", default: 0, null: false
    t.string "name", null: false
    t.string "email", null: false
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "block_transactions", "addresses", column: "from_address_id"
  add_foreign_key "block_transactions", "addresses", column: "to_address_id"
  add_foreign_key "logs", "addresses"
  add_foreign_key "logs", "block_transactions"
  add_foreign_key "token_prices", "addresses", column: "token_id"
  add_foreign_key "transaction_actions", "addresses", column: "from_address_id"
  add_foreign_key "transaction_actions", "addresses", column: "holder_address_id"
  add_foreign_key "transaction_actions", "addresses", column: "to_address_id"
  add_foreign_key "transaction_actions", "block_transactions"
  add_foreign_key "transaction_method_parameter_addresses", "addresses"
  add_foreign_key "transaction_method_parameter_addresses", "transaction_method_parameters", column: "parameter_id"
  add_foreign_key "transaction_method_parameters", "transaction_methods"
  add_foreign_key "transaction_methods", "addresses", column: "contract_id"
  add_foreign_key "transaction_methods", "block_transactions"
end
