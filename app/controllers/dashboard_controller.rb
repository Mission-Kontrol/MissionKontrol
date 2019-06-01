# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!
  before_action :setup_demo_target_database,
                :test_target_db_connection,
                :load_available_tables, only: [:show]
  before_action :load_admin_db_config, only: [:show]
  before_action :load_task_queues, only: [:show]
  skip_before_action :check_license, only: %i[license verify_license]
  layout 'license', only: %i[license verify_license]

  def show; end

  def license; end

  def verify_license
    current_admin_user.license_key = params[:license_key] if params[:license_key]

    if license_verified
      current_admin_user.save
      redirect_to dashboard_path
    else
      render 'verify_license'
    end
  end

  private

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
