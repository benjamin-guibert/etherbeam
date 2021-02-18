# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', skip:
  %i[sessions passwords registrations unlocks confirmations
     token_validations]

  devise_scope :user do
    post 'auth/login', to: 'devise_token_auth/sessions#create'
    delete 'auth/logout', to: 'devise_token_auth/sessions#destroy'
  end

  resources :contracts, only: :index

  resources :contract_tokens, only: :index
  get '/contract_tokens/:address', to: 'contract_tokens#show'
  post '/contract_tokens/:address/prices', to: 'contract_token_prices#save'

  resources :block_transactions, only: :index
  post '/block_transactions', to: 'block_transactions#save'
end
