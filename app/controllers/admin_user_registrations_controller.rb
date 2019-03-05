# frozen_string_literal: true

class AdminUserRegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?

  layout 'application', only: [:new]

  def create
    test_target_db_connection
    super

  rescue Mysql2::Error,
         PG::ConnectionBad,
         Kuwinda::Gateway::InvalidClientDatabaseError => e

   flash[:error] = "Invalid target database, please review credentials."
   build_resource
   clean_up_passwords(resource)
   render(action: :new, status:422) and return
  end

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
    Kuwinda::UseCase::DatabaseConnection.new.execute
    resource
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
    devise_parameter_sanitizer.permit(
      :account_update,
      keys: %w[
        first_name
        last_name
        company_name
      ] + permitted_admin_db_params + permitted_target_db_params
    )
  end

  def after_update_path_for(_resource)
    dashboard_path
  end

  def test_target_db_connection
    ActiveRecord::Base.establish_connection(
      :adapter  => adapter(params["admin_user"]["target_database_type"]),
      :host     => params["admin_user"]["target_database_host"],
      :username => params["admin_user"]["target_database_username"],
      :password => params["admin_user"]["target_database_password"],
      :database => params["admin_user"]["target_database_name"]
    ).connection
  end

  def adapter(scheme)
    case scheme
    when 'postgresql', 'postgres'
      return 'postgresql'
    when 'mysql', 'mysql2'
      return 'mysql2'
    else
      raise Kuwinda::Gateway::InvalidClientDatabaseError.new("don't know how to make adpater for #{scheme}")
    end
  end
end
