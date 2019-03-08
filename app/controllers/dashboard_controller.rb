# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!
  before_action :load_view_builders,
                :load_available_tables


  def show
    if ENV['APP_ENV'] == 'demo'
      begin
        test_target_db_connection
      rescue Mysql2::Error,
             PG::ConnectionBad,
             InvalidClientDatabaseError => e
       uri = URI.parse(ENV['DEMO_DATABASE_PG'])
       current_admin_user.target_database_host = uri.host
       current_admin_user.target_database_name = uri.path.from(1)
       current_admin_user.target_database_username = uri.user
       current_admin_user.target_database_password = uri.password
       current_admin_user.target_database_port = uri.port
       current_admin_user.target_database_type = 'postgres'
       @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
      end
    end
  end

  private

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end
end
