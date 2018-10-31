# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, :controllers => {:registrations => "admin_user_registrations"}

  root to: 'home#index'

  resources :admin_users, only: :index
  resources :users, only: %i[index show]
  resources :companies, only: %i[index show]
  resources :work_lists, only: %i[index show]
  resources :reports, only: %i[index]
  resources :activities, only: :create

  get 'dashboard', to: 'dashboard#show'
  get 'work_lists/index'
  get 'work_lists/show'
end
