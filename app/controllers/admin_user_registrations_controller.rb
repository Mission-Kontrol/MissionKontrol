class AdminUserRegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout "empty"

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :admin_database_name,
      :admin_database_username,
      :admin_database_password,
      :admin_database_host,
      :admin_database_port,
      :target_database_name,
      :target_database_username,
      :target_database_password,
      :target_database_host,
      :target_database_port
      ])
  end

  def after_update_path_for(resource)
    dashboard_path
  end
end
