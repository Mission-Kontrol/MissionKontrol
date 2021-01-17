# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include License
  include DatabasePresenterActions

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :set_cache_headers, :load_available_databases, :load_task_queues, :load_databases_with_task_queues
  protect_from_forgery with: :exception

  rescue_from OpenSSL::SSL::SSLError, with: :handle_openssl_error

  around_action :handle_internal_db_errors

  rescue_from InvalidClientDatabaseError,
              ActiveRecord::NoDatabaseError,
              ActiveSupport::MessageVerifier::InvalidSignature,
              SocketError, :with => :handle_invalid_client_db_error

  def check_license
    redirect_to license_path unless license_valid? || Rails.env.development?
  end

  def referred_from_demo?
    request.host_with_port == 'demo.kuwinda.io' && Rails.env.production?
  end

  protected

  # rubocop:disable Style/RescueStandardError
  def handle_internal_db_errors
    begin
      yield
    rescue OpenSSL::SSL::SSLError
      handle_openssl_error
    rescue
      if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
        ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        yield if ActiveRecord::Base.connection.active?
      else
        redirect_to '/database_connection_error', format: 'js'
      end
    end
  end
  # rubocop:enable Style/RescueStandardError

  def handle_internal_db_error
    if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
      ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
      ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
      return if ActiveRecord::Base.connection.active?
    else
      redirect_to '/database_connection_error', format: 'js'
    end
  end

  def handle_invalid_client_db_error
    if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
      ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
      ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
    end
    @available_tables = []
    @task_queues = []
    current_organisation = OrganisationSetting.last

    if request.path == edit_organisation_setting_path(current_organisation)
      render 'organisation_settings/edit'
    else
      redirect_to '/database_connection_error', format: 'js'
    end
  end

  def reconnect_to_database
    ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
  end

  def handle_openssl_error
    current_organisation = OrganisationSetting.last
    license_key = current_organisation.license_key

    unless license_key.blank?
      cache_key = "license-#{license_key}"
      Rails.cache.fetch(cache_key, expires_in: 10.minutes) { cache_key }
    end
    render '/dashboard/show'
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end

  def after_sign_out_path_for(resource_or_scope)
    new_admin_user_session_path
  end

  private

  def load_available_databases
    @available_databases = Database.all
  end

  def load_task_queues
    @task_queues = TaskQueue.all
  end

  # rubocop:disable Style/RescueStandardError
  def load_databases_with_task_queues
    begin
      database_ids = TaskQueue.enabled&.map(&:database_id)&.uniq
      @databases_with_task_queues = Database.where(id: database_ids)
    rescue
      if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
        ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        retry if ActiveRecord::Base.connection.active?
      end
    end
  end
  # rubocop:enable Style/RescueStandardError

  def set_cache_headers
    if request.xhr?
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Mon, 01 Jan 1990 00:00:00 GMT"
    end
  end
end
