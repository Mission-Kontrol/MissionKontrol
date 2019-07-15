# frozen_string_literal: true

class AdminUserRegistrationsController < Devise::RegistrationsController
  before_action :check_admin_user_exists, only: [:new]
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout 'application', only: [:new]

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
    update_target_db_connection
  end

  def permitted_admin_db_params
    %i[
      admin_database_name
      admin_database_username
      admin_database_password
      admin_database_host
      admin_database_port
      admin_database_type
    ]
  end

  def permitted_target_db_params
    %i[
      target_database_name
      target_database_username
      target_database_password
      target_database_host
      target_database_port
      target_database_type
    ]
  end

  def configure_permitted_parameters
    db_params = permitted_admin_db_params + permitted_target_db_params
    keys = %w[
      license_key
      activation_id
      full_license
      first_name
      last_name
      company_name
      twilio_caller_id
      twilio_auth_token
      twilio_account_sid
      twilio_application_sid
    ] + db_params

    devise_parameter_sanitizer.permit(:account_update, keys: keys)
    devise_parameter_sanitizer.permit(:sign_up, keys: keys)
  end

  def after_update_path_for(_resource)
    dashboard_path
  end

  def update_target_db_connection
    ActiveRecord::Base.establish_connection(
      adapter: adapter_for_db(current_admin_user.target_database_type),
      host: current_admin_user.target_database_host,
      username: current_admin_user.target_database_username,
      password: current_admin_user.target_database_password,
      database: current_admin_user.target_database_name,
      port: current_admin_user.target_database_port
    ).connection
  end

  private

  def check_admin_user_exists
    if AdminUser.any?
      redirect_to new_admin_user_session_path
    end
  end
end
