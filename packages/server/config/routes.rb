# frozen_string_literal: true

Rails.application.routes.draw do
  resources :contracts, only: :index

  resources :tokens, only: :index
  get '/tokens/:address', to: 'tokens#show'
  post '/tokens/:address/prices', to: 'token_prices#save'

  resources :block_transactions, only: :index
  post '/block_transactions', to: 'block_transactions#save'
end
