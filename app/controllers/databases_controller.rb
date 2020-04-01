# frozen_string_literal: true

class DatabasesController < ApplicationController
  layout 'standard'

  before_action :check_user_permissions, only: %i[new edit]

  IGNORED_COLUMNS = %w[id created_at updated_at].freeze

  def index
    @databases = Database.all
    can_add = current_admin_user.admin_abilities? && params[:settings]
    json = { databases: @databases.sort, can_add: can_add }.to_json

    respond_to do |format|
      format.js { render json: json }
    end
  end

  def new
    @database = Database.new
  end

  def create
    if testing?
      @active_connection = test_connection
      render :test_connection and return
    else
      @database = Database.new(database_params)
      @database.password = password_param
      @result = @database.save!
      update_available_permissions
      update_target_table_settings
      redirect_to permissions_path
    end
  end

  def edit
    @database = Database.find(params[:id])
  end

  def update
    if testing?
      @active_connection = test_connection
      render :test_connection and return
    else
      @database = Database.find(params[:id])
      @database.update_attributes(database_params_update) if params[:database]
      update_available_permissions
      update_target_table_settings
      @result = @database.save!
      redirect_to permissions_path
    end
  end

  def destroy
    database = Database.find(params[:id])
    database.delete
    redirect_to dashboard_path
  end

  private

  def check_user_permissions
    return if current_admin_user.admin_abilities?

    flash[:alert] = 'You do not have sufficient permissions to manage database settings'
    redirect_to(dashboard_path)
  end

  def database_params
    params.require(:database).permit(:friendly_name,
                                     :adapter,
                                     :host,
                                     :port,
                                     :name,
                                     :password,
                                     :username)
  end

  def database_params_update
    permitted = params.require(:database).permit(:friendly_name,
                                                 :adapter,
                                                 :host,
                                                 :port,
                                                 :name,
                                                 :username)

    permitted.merge!(password: params[:database][:password]) if params[:database][:password_changed]
    permitted
  end

  def password_param
    params[:database][:password]
  end

  def testing?
    params[:commit] == 'Test connection'
  end

  def test_connection
    connection = ActiveRecord::Base.establish_connection(
      adapter: adapter_for_db(database_params[:adapter]),
      host: database_params[:host],
      username: database_params[:username],
      password: password_param,
      database: database_params[:name],
      port: database_params[:port]
    ).connection

    connection.active?
  rescue PG::ConnectionBad
    false
  end

  def database_connection
    Kuwinda::UseCase::DatabaseConnection.new(@database).execute
  end

  def available_tables
    @database_connection = database_connection
    Kuwinda::Presenter::ListAvailableTables.new(@database_connection).call.to_a
  end

  def update_available_permissions
    @available_tables = available_tables
    database_permissions = Permission.where(subject_id: @database.id).map(&:subject_class)
    @available_tables.each do |table|
      next if database_permissions.include? table

      create_action_permissions(table)
    end
  end

  def update_target_table_settings
    target_table_settings = TargetTableSetting.where(database_id: @database.id)
    target_table_settings_names = target_table_settings.map(&:name)

    @available_tables.each do |table|
      columns = target_db.table_columns(table)

      if target_table_settings_names.include? table
        target_table_settings.find_by(name: table).update_editable_fields(columns)
        next
      end

      new_target_table_setting = TargetTableSetting.create!(name: table, database_id: @database.id)
      new_target_table_setting.create_editable_fields(columns)
      new_target_table_setting.save!
    end
  end

  def create_action_permissions(table)
    %w[view create edit delete].each do |action|
      next if Permission.find_by(subject_id: @database.id, subject_class: table, action: action)

      Permission.create!(subject_id: @database.id, subject_class: table, action: action)
    end
  end

  def target_db
    @target_db ||= Kuwinda::Repository::TargetDB.new(database_connection)
  end
end
