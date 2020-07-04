# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!, except: %i[license verify_license]
  before_action :load_admin_db_config,
                :load_task_queues,
                :check_license, only: [:show]
  before_action :set_databases

  layout 'license', only: %i[license verify_license]

  def show
    full_license = OrganisationSetting.last.full_license
    @trial_license = !full_license
    @activities_for_user = Activity.where(
      user_id: current_admin_user.id
    ).sort_by(&:created_at).reverse[0..4]
  end

  def license
    redirect_to dashboard_path if license_valid?
  end

  def verify_license
    license_key = params[:license_key]
    license_valid = activate_license(license_key)

    if license_valid && AdminUser.count.zero?
      save_license(license_key: license_key, full_license: false)
      redirect_to new_admin_user_registration_path
    elsif license_valid
      save_license(license_key: license_key, full_license: false)
      redirect_to admin_user_registration_path
    else
      render 'verify_license'
    end
  end

  private

  def set_databases
    @databases = Database.all.sort
  end

  def save_license(license_key:, full_license:)
    OrganisationSetting.create!(
      license_key: license_key,
      full_license: full_license
    )
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
