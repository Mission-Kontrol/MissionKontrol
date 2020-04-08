# frozen_string_literal: true

module DatabaseActions
  extend ActiveSupport::Concern

  private

  def create_database_actions
    case params[:commit]
    when 'Test connection'
      test_database_connection
    else
      create_database_attributes
    end
  end

  def update_database_actions
    case params[:commit]
    when 'Test connection'
      test_database_connection
    when 'Test gem'
      test_gem_connection
    when 'Remove gem'
      remove_gem_connection
    else
      update_database_attributes
    end
  end

  def create_database_attributes
    @database.password = password_param
    @result = @database.save!
    create_or_update_related_attributes
  end

  def update_database_attributes
    @database.update_attributes(database_params_update) if params[:database]
    create_or_update_related_attributes
    @result = @database.save!
  end

  def create_or_update_related_attributes
    create_or_update_available_permissions
    create_or_update_target_table_settings
  end

  def test_database_connection
    @active_connection = test_connection
    render :test_connection and return
  end

  def test_connection
    connection = ActiveRecord::Base.establish_connection(
      adapter: Kuwinda::DatabaseAdapter.adapter(database_params[:adapter]),
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

  def remove_gem_connection
    @result = @database.update_attributes!(domain_url: nil, gem_token: nil)
  end

  def create_or_update_available_permissions
    @available_tables = available_tables
    database_permissions = Permission.where(subject_id: @database.id).map(&:subject_class)
    @available_tables.each do |table|
      next if database_permissions.include? table

      create_action_permissions(table)
    end
  end

  def create_or_update_target_table_settings
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

  def database_connection
    Kuwinda::UseCase::DatabaseConnection.new(@database).execute
  end

  def available_tables
    @database_connection = database_connection
    Kuwinda::Presenter::ListAvailableTables.new(@database_connection).call.to_a
  end

  def target_db
    @target_db ||= Kuwinda::Repository::TargetDB.new(database_connection)
  end
end
