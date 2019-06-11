# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  include License
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  rescue_from InvalidClientDatabaseError,
              ActiveRecord::NoDatabaseError, :with => :handle_invalid_client_db_error

  # before_action :verify_setup_completed, :if => :env_is_demo?

  def check_license
    redirect_to license_path unless license_valid?
  end

  protected

  def env_is_demo?
    request.host_with_port == 'demo.kuwinda.io'
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end

  # def after_sign_up_path_for(resource)
  #   test_target_db_connection
  #   new_layout_path
  #
  # rescue Mysql2::Error,
  #        PG::ConnectionBad,
  #        InvalidClientDatabaseError => e
  #  flash.discard
  #  flash[:error] = "Invalid target database, please review credentials."
  #  @available_tables = []
  # end

  # def after_sign_in_path_for(user)
  #   setup_demo_target_database
  #   test_target_db_connection
  #   dashboard_path
  #
  # rescue Mysql2::Error,
  #        PG::ConnectionBad,
  #        InvalidClientDatabaseError => e
  #  flash.discard
  #  flash[:error] = "Invalid target database, please review credentials."
  #  @available_tables = []
  #  dashboard_path
  # end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(ClientRecord, table).call
  end

  private

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def load_task_queues
    @task_queues = TaskQueue.all
  end

  # def test_target_db_connection
  #   ActiveRecord::Base.establish_connection(
  #     :adapter  => adapter(current_admin_user.target_database_type),
  #     :host     => current_admin_user.target_database_host,
  #     :username => current_admin_user.target_database_username,
  #     :password => current_admin_user.target_database_password,
  #     :database => current_admin_user.target_database_name
  #   ).connection
  # rescue Exception => e
  #   setup_demo_target_database
  #   load_available_tables
  # end
  #
  # def setup_demo_target_database
  #   unless is_demo_target_database_valid?
  #     uri = URI.parse(ENV['DEMO_DATABASE_PG'])
  #     current_admin_user.target_database_host = uri.host
  #     current_admin_user.target_database_name = uri.path.from(1)
  #     current_admin_user.target_database_username = uri.user
  #     current_admin_user.target_database_password = uri.password
  #     current_admin_user.target_database_port = uri.port
  #     current_admin_user.target_database_type = 'postgres'
  #   end
  # end

  # def is_demo_target_database_valid?
  #   current_admin_user &&
  #   !current_admin_user.target_database_host.blank? &&
  #   !current_admin_user.target_database_name.blank? &&
  #   !current_admin_user.target_database_username.blank? &&
  #   !current_admin_user.target_database_password.blank? &&
  #   !current_admin_user.target_database_port.blank? &&
  #   !current_admin_user.target_database_type.blank?
  # end

  # def adapter(scheme)
  #  case scheme
  #  when 'postgresql', 'postgres'
  #    return 'postgresql'
  #  when 'mysql', 'mysql2'
  #    return 'mysql2'
  #  else
  #    raise InvalidClientDatabaseError.new("don't know how to make adpater for #{scheme}")
  #  end
  # end

  def handle_invalid_client_db_error
    @available_tables = []
    @task_queues = []
    render '/tables/bad_connection'
  end

  #
  # TODO: This method needs a review, not sure what the goal should be and if it
  # should fire for every action, especially authentication related actions (Devise)

  # def verify_setup_completed
  #   return if request.path == '/admin_users/sign_up'
  #
  #   if request.host_with_port == 'demo.kuwinda.io'
  #     setup_demo_target_database_params
  #   elsif SensitiveData.get_target_database_credential(:database_name).nil?
  #     redirect_to new_admin_user_registration_url unless params["admin_user"] && params["admin_user"]["target_database_name"]
  #   end
  # end

  # def verify_setup_completed
  #   setup_demo_target_database_params
  # end

  # def setup_demo_target_database_params
  #   uri = URI.parse(ENV['DEMO_DATABASE_PG'])
  #   SensitiveData.set_target_database_credential(:database_name, uri.path.from(1))
  #   SensitiveData.set_target_database_credential(:database_username, uri.user)
  #   SensitiveData.set_target_database_credential(:database_password, uri.password)
  #   SensitiveData.set_target_database_credential(:database_host, uri.host)
  #   SensitiveData.set_target_database_credential(:database_port, uri.port)
  #   SensitiveData.set_target_database_credential(:database_type, 'postgres')
  # end
end
