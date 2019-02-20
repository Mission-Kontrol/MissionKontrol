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
  resources :work_lists, only: %i[index show new create edit update]

  resources :tables, only: %i[show]
  get 'tables/:table_name/:record_id', to: 'tables#preview', as: 'table_record_preview'

  patch 'table_field', to: 'tables#update_table_field', as: 'update_table_field'
  patch 'related_table_field', to: 'tables#update_related_table_field', as: 'update_related_table_field'

  get 'layouts/table_fields_with_type', to: 'layout_builder#table_fields_with_type'
  resources :layout_builder, as: "layouts", path: 'layouts'
  get 'layouts/:id/preview', to: 'layout_builder#preview', as: 'layout_builder_preview'

  resources :layout_settings, only: %i[create update]

  get 'view_builder/table_fields', to: 'view_builder#table_fields'
  get 'view_builder/view', to: 'view_builder#view_page'
  get 'view_builder/retrieve_data', to: 'view_builder#retrieve_data'

  resources :view_builder

  resources :reports, only: %i[index]
  resources :activities, only: :create

  get 'dashboard', to: 'dashboard#show'
  post 'add-sql-filter', to: 'work_lists#add_sql_filter'
  post 'remove-sql-filter', to: 'work_lists#remove_sql_filter'
  post 'remove-work-list-outcome', to: 'work_lists#remove_work_list_outcome'
  post 'add-work-list-outcome', to: 'work_lists#add_work_list_outcome'
end
