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
    root to: "dashboard#license"
  end

  resources :admin_users, only: :index
  resources :task_queues, only: %i[index show new create edit update] do
    member do
      post 'outcome'
      get 'record'
    end
  end

  resources :tables, only: %i[show]
  get 'tables/:table_name/:record_id', to: 'tables#preview', as: 'table_record_preview'
  patch 'tables/:table_name/hide-column', to: 'tables#hide_column', as: 'table_hide_column'
  patch 'tables/:table_name/show-column', to: 'tables#show_column', as: 'table_show_column'

  patch 'table_field', to: 'tables#update_table_field', as: 'update_table_field'
  patch 'related_table_field', to: 'tables#update_related_table_field', as: 'update_related_table_field'

  get 'layouts/table_fields_with_type', to: 'layout_builder#table_fields_with_type'
  resources :layout_builder, as: "layouts", path: 'layouts'
  get 'layouts/:id/preview', to: 'layout_builder#preview', as: 'layout_builder_preview'

  get 'view_builder/table_fields', to: 'view_builder#table_fields'
  get 'view_builder/view', to: 'view_builder#view_page'
  get 'view_builder/retrieve_data', to: 'view_builder#retrieve_data'

  resources :view_builder
  resources :activities, only: :create

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
end
