# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', skip:
  %i[sessions passwords registrations unlocks confirmations token_validations]

  # mount_devise_token_auth_for 'User', at: 'auth', controllers: {
  #   sessions: 'sessions',
  #   token_validations: 'token_validations'
  # }, skip: %i[passwords registrations unlocks confirmations]

  devise_scope :user do
    get 'auth/validate_token', to: 'token_validations#validate_token'
    post 'auth/sign_in', to: 'sessions#create'
    delete 'auth/sign_out', to: 'sessions#destroy'
  end

  resources :contracts, only: :index

  resources :contract_tokens, only: :index
  get '/contract_tokens/:address', to: 'contract_tokens#show'
  post '/contract_tokens/:address/prices', to: 'contract_token_prices#save'

  resources :block_transactions, only: :index
  post '/block_transactions', to: 'block_transactions#save'
end
