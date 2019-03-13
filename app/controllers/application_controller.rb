# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  rescue_from InvalidClientDatabaseError,
              ActiveRecord::NoDatabaseError, :with => :handle_invalid_client_db_error

  private

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def test_target_db_connection
    ActiveRecord::Base.establish_connection(
      :adapter  => adapter(current_admin_user.target_database_type),
      :host     => current_admin_user.target_database_host,
      :username => current_admin_user.target_database_username,
      :password => current_admin_user.target_database_password,
      :database => current_admin_user.target_database_name
    ).connection
  rescue Exception => e
    setup_demo_target_database
    load_available_tables
  end

  def setup_demo_target_database
    unless is_demo_target_database_valid?
      uri = URI.parse(ENV['DEMO_DATABASE_PG'])
      current_admin_user.target_database_host = uri.host
      current_admin_user.target_database_name = uri.path.from(1)
      current_admin_user.target_database_username = uri.user
      current_admin_user.target_database_password = uri.password
      current_admin_user.target_database_port = uri.port
      current_admin_user.target_database_type = 'postgres'
    end
  end

  def is_demo_target_database_valid?
    !current_admin_user.target_database_host.blank? &&
    !current_admin_user.target_database_name.blank? &&
    !current_admin_user.target_database_username.blank? &&
    !current_admin_user.target_database_password.blank? &&
    !current_admin_user.target_database_port.blank? &&
    !current_admin_user.target_database_type.blank?
  end

  protected

  def after_sign_up_path_for(resource)
    test_target_db_connection
    new_layout_path

  rescue Mysql2::Error,
         PG::ConnectionBad,
         InvalidClientDatabaseError => e
   flash.discard
   flash[:error] = "Invalid target database, please review credentials."
   @available_tables = []
  end

  def after_sign_in_path_for(user)
    setup_demo_target_database
    test_target_db_connection
    dashboard_path

  rescue Mysql2::Error,
         PG::ConnectionBad,
         InvalidClientDatabaseError => e
   flash.discard
   flash[:error] = "Invalid target database, please review credentials."
   @available_tables = []
   dashboard_path
  end

  private

  def test_target_db_connection
    ActiveRecord::Base.establish_connection(
      :adapter  => adapter(current_admin_user.target_database_type),
      :host     => current_admin_user.target_database_host,
      :username => current_admin_user.target_database_username,
      :password => current_admin_user.target_database_password,
      :database => current_admin_user.target_database_name
    ).connection
  end

  def adapter(scheme)
   case scheme
   when 'postgresql', 'postgres'
     return 'postgresql'
   when 'mysql', 'mysql2'
     return 'mysql2'
   else
     raise InvalidClientDatabaseError.new("don't know how to make adpater for #{scheme}")
   end
  end

  def handle_invalid_client_db_error
    @available_tables = []
    render '/tables/bad_connection'
  end
end
