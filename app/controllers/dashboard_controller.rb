# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!
  before_action :setup_demo_target_database,
                :test_target_db_connection,
                :load_available_tables, only: [:show]
  before_action :load_admin_db_config, only: [:show]
  before_action :load_task_queues, only: [:show]
  before_action :check_license, only: [:show]
  layout 'license', only: %i[license verify_license]

  def show; end

  def license; end

  def verify_license
    activate_admin_license if params[:activation_id]
    admin_license_valid = verify_admin_license if params[:license_key]

    if admin_license_valid
      current_admin_user.save
      redirect_to dashboard_path
    end
  end

  private

  def activate_admin_license
    current_admin_user.activation_id = params[:activation_id]
    activate_license
  end

  def verify_admin_license
    current_admin_user.license_key = params[:license_key]
    verify_license_key[:status] == 200
  end

  def load_admin_db_config
    db = Rails.configuration.database_configuration[Rails.env]
    @admin_database = OpenStruct.new
    @admin_database.username = db['username']
    @admin_database.database = db['database']
    @admin_database.password = db['password']
    @admin_database.host = db['host']
    @admin_database.type = db['adapter']
    @admin_database.port = db['port']
  end
end
