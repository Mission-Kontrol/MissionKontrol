# frozen_string_literal: true

Rails.application.routes.draw do
  get 'work_lists/index'

  get 'work_lists/show'

  devise_for :admin_users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :admin_users, only: :index
  resources :users, only: %i[index show]
  resources :companies, only: %i[index show]
  resources :work_lists, only: %i[index show]
  resources :reports, only: %i[index]

  get 'dashboard', to: 'dashboard#show'

  resources :activities, only: :create
end
