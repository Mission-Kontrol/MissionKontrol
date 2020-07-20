# frozen_string_literal: true

module DatabaseActions
  extend ActiveSupport::Concern
  include HTTParty

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
      password: database_password,
      database: database_params[:name],
      port: database_params[:port]
    ).connection

    connection.active?
  rescue PG::ConnectionBad
    false
  end

  def database_password
    if @database.persisted?
      @database.password == password_param ? decrypt_password(@database.password) : password_param
    else
      password_param
    end
  end

  def test_gem_connection
    base_url = database_params_update[:domain_url]
    query = {
      token: database_params_update[:gem_token]
    }

    response = HTTParty.get(base_url + '/models/associations', query: query)
    @active_gem_connection = response.code == 200
    render :test_gem and return
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
        begin
          target_table_settings.find_by(name: table).update_editable_fields(columns)
          next
        rescue ActiveRecord::StatementInvalid, PG::UndefinedTable
          if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
            ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
            ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
            retry if ActiveRecord::Base.connection.active?
          end
        end
      end

      begin
        new_target_table_setting = TargetTableSetting.create!(name: table, database_id: @database.id)
        new_target_table_setting.create_editable_fields(columns)
        new_target_table_setting.save!
      rescue ActiveRecord::StatementInvalid, PG::UndefinedTable
        if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
          ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
          retry if ActiveRecord::Base.connection.active?
        end
      end
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

  def decrypt_password(password)
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
    crypt.decrypt_and_verify(password)
  end
end
