# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!
  before_action :test_target_db_connection,
                :setup_demo_target_database,
                :load_available_tables, only: [:show]

  def show; end

  private

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
end
