# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :load_view_builders
  rescue_from InvalidClientDatabaseError, :with => :handle_invalid_client_db_error
  rescue_from ActiveRecord::NoDatabaseError, :with => :handle_no_database_error

  private

  def load_view_builders
    @view_builders = ViewBuilder.where(status: 'active')
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
   flash[:error] = e.message
   @available_tables = []
  end

  def after_sign_in_path_for(user)
    test_target_db_connection
    dashboard_path

  rescue Mysql2::Error,
         PG::ConnectionBad,
         InvalidClientDatabaseError => e
   flash.discard
   flash[:error] = "Invalid target database, please review credentials."
   flash[:error] = e.message
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

  def handle_no_database_error
    flash[:error] = "Invalid target database, please review credentials."
    redirect_to dashboard_path
  end
end
