# frozen_string_literal: true

class OrganisationSettingsController < ApplicationController
  include UserAbilities

  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection, except: [:update]
  before_action :check_user_admin_abilities, only: %i[edit]

  def edit
    @organisation = OrganisationSetting.find params[:id]
  end

  def update
    @organisation = OrganisationSetting.find params[:id]

    update_target_db_connection if organisation_params[:target_database_host].present?
    return unless @organisation.update!(organisation_params)
  end

  private

  def update_target_db_connection
    connected = ActiveRecord::Base.establish_connection(
      adapter: adapter_for_db(organisation_params[:target_database_type]),
      host: organisation_params[:target_database_host],
      username: organisation_params[:target_database_username],
      password: organisation_params[:target_database_password],
      database: organisation_params[:target_database_name],
      port: organisation_params[:target_database_port]
    ).connection
    update_available_permissions if connected
    update_target_table_settings if connected
  end

  def permitted_target_db_params
    %i[
      target_database_name
      target_database_username
      target_database_password
      target_database_host
      target_database_port
      target_database_type
    ]
  end

  def organisation_params
    params.require(:organisation_setting).permit(:company_name, :license_key, permitted_target_db_params)
  end

  def update_available_permissions
    available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call.to_a
    database_permissions = Permission.all.map(&:subject_class)
    available_tables.each do |table|
      next if database_permissions.include? table

      create_action_permissions(table)
    end
  end

  def update_target_table_settings
    available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call.to_a
    target_table_settings = TargetTableSetting.all.map(&:name)
    available_tables.each do |table|
      next if target_table_settings.include? table

      TargetTableSetting.create!(name: table)
    end
  end

  def create_action_permissions(table)
    Permission.create!(subject_class: table, action: 'view')
    Permission.create!(subject_class: table, action: 'create')
    Permission.create!(subject_class: table, action: 'edit')
    Permission.create!(subject_class: table, action: 'delete')
  end
end
