# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!, except: %i[license verify_license]
  before_action :load_available_tables,
                :load_admin_db_config,
                :load_task_queues,
                :check_license,
                :check_target_db_connection, only: [:show]

  layout 'license', only: %i[license verify_license]

  def show; end

  def license
    redirect_to dashboard_path if license_valid?
  end

  def verify_license
    license_key, activation_id = verify_license!(params[:license_key], 'trial')
    full_license_key, full_activation_id = verify_license!(params[:license_key], 'full') unless license_key && activation_id

    if current_admin_user
      if license_key && activation_id
        verify_license_as_trial(license_key, activation_id)
        redirect_to dashboard_path
      elsif full_license_key && full_activation_id
        verify_license_as_full(full_license_key, full_activation_id)
        redirect_to dashboard_path
      else
        render 'verify_license'
      end
    elsif license_key && activation_id
      redirect_to controller: 'admin_user_registrations', action: 'new', license_key: license_key, activation_id: activation_id
    elsif full_license_key && full_activation_id
      redirect_to controller: 'admin_user_registrations', action: 'new', license_key: license_key, activation_id: activation_id, full_license: true
    else
      render 'verify_license'
    end
  end

  private

  def verify_license_as_trial(license_key, activation_id)
    current_admin_user.license_key = license_key
    current_admin_user.activation_id = activation_id
    current_admin_user.save
  end

  def verify_license_as_full(full_license_key, full_activation_id)
    current_admin_user.license_key = full_license_key
    current_admin_user.activation_id = full_activation_id
    current_admin_user.full_license = true
    current_admin_user.save
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
