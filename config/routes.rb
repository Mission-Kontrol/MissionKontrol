# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for(
    :admin_users,
    controllers: {
      registrations: 'admin_user_registrations',
      sessions: 'admin_user_sessions'
    }
  )

  devise_scope :admin_user do
    root to: "admin_user_registrations#new"
  end

  resources :task_queues, only: %i[index show create edit update] do
    member do
      post 'outcome'
      get 'record'
      get 'preview'
      get 'field_settings'
    end
  end

  resources :tables, only: %i[show]
  get 'tables/:table_name/:record_id', to: 'tables#preview', as: 'table_record_preview'

  patch 'table_field', to: 'tables#update_table_field', as: 'update_table_field'
  patch 'related_table_field', to: 'tables#update_related_table_field', as: 'update_related_table_field'

  get 'layouts/table_fields_with_type', to: 'layout_builder#table_fields_with_type'
  resources :layout_builder, as: "layouts", path: 'layouts'
  get 'layouts/:id/preview', to: 'layout_builder#preview', as: 'layout_builder_preview'
  patch 'layouts/:id/related_tables', to: 'layout_builder#update_related_tables', as: 'update_related_tables'
  patch 'layouts/:id/related_tables/remove', to: 'layout_builder#remove_related_table', as: 'remove_related_table'

  get 'view_builder/table_fields', to: 'view_builder#table_fields'
  get 'view_builder/view', to: 'view_builder#view_page'
  get 'view_builder/retrieve_data', to: 'view_builder#retrieve_data'

  resources :view_builder
  resources :activities, only: :create

  resources :organisation_settings, only: %i[edit update]
  resources :admin_users, only: :index
  resources :permissions, only: :index

  post 'permissions/add_to_role', to: 'permissions#add_to_role', as: 'add_to_role'
  post 'permissions/remove_from_role', to: 'permissions#remove_from_role'

  resource :roles

  get 'dashboard', to: 'dashboard#show'
  post 'add-sql-filter', to: 'work_lists#add_sql_filter'
  post 'remove-sql-filter', to: 'work_lists#remove_sql_filter'
  post 'remove-work-list-outcome', to: 'work_lists#remove_work_list_outcome'
  post 'add-work-list-outcome', to: 'work_lists#add_work_list_outcome'

  post 'token/generate' => 'token#generate'
  post 'call/connect' => 'call#connect'

  get 'license', to: 'dashboard#license'
  post 'license/verify', to: 'dashboard#verify_license'
  get 'license/verify', to: 'dashboard#verify_license', as: 'verify_license'

  get 'data_table_states/load'
  post 'data_table_states/save'
end
