# frozen_string_literal: true

class AdminUserRegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout 'application', only: [:new]

  after_action :set_target_database_credentials, only: :create

  protected

  def set_target_database_credentials
    admin_user = AdminUser.find_by(email: admin_user_params[:email])
    admin_user.first_name = admin_user_params[:first_name]
    admin_user.last_name = admin_user_params[:last_name]
    admin_user.company_name = admin_user_params[:company_name]
    admin_user.target_database_type = admin_user_params[:target_database_type]
    admin_user.target_database_name = admin_user_params[:target_database_name]
    admin_user.target_database_username = admin_user_params[:target_database_username]
    admin_user.target_database_password = admin_user_params[:target_database_password]
    admin_user.target_database_host = admin_user_params[:target_database_host]
    admin_user.target_database_port = admin_user_params[:target_database_port]
    admin_user.save!
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
    Kuwinda::UseCase::DatabaseConnection.new.execute
  rescue Kuwinda::Gateway::InvalidClientDatabaseError
    resource
  end

  # def permitted_admin_db_params
  #   %i[
  #     admin_database_name
  #     admin_database_username
  #     admin_database_password
  #     admin_database_host
  #     admin_database_port
  #     admin_database_type
  #   ]
  # end
  #
  # def permitted_target_db_params
  #   %i[
  #     target_database_name
  #     target_database_username
  #     target_database_password
  #     target_database_host
  #     target_database_port
  #     target_database_type
  #   ]
  # end

  def configure_permitted_parameters
    # db_params = permitted_admin_db_params + permitted_target_db_params
    # devise_parameter_sanitizer.permit(
    #   :account_update,
    #   keys: %w[
    #     first_name
    #     last_name
    #     company_name
    #   ] + permitted_admin_db_params + permitted_target_db_params
    # )
    # devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(admin_user: [:first_name, :last_name]) }
    # devise_parameter_sanitizer.permit(:sign_up, keys: [admin_user: [:first_name, :last_name, :company_name]])
  end

  def after_update_path_for(_resource)
    dashboard_path
  end

  def admin_user_params
    params.require(:admin_user).permit(:email,
                                       :first_name,
                                       :last_name,
                                       :company_name,
                                       :target_database_type,
                                       :target_database_name,
                                       :target_database_username,
                                       :target_database_password,
                                       :target_database_host,
                                       :target_database_port)
  end
end
