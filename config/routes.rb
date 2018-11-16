# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for(
    :admin_users,
    controllers: {
      registrations: 'admin_user_registrations'
    }
  )

  root to: 'home#index'

  resources :admin_users, only: :index
  resources :users, only: %i[index show]
  resources :companies, only: %i[index show]
  resources :work_lists, only: %i[index show new create edit update]
  resources :reports, only: %i[index]
  resources :activities, only: :create

  get 'dashboard', to: 'dashboard#show'
  post 'add-sql-filter', to: 'work_lists#add_sql_filter'
  post 'remove-sql-filter', to: 'work_lists#remove_sql_filter'
  post 'remove-work-list-outcome', to: 'work_lists#remove_work_list_outcome'
  post 'add-work-list-outcome', to: 'work_lists#add_work_list_outcome'
end
