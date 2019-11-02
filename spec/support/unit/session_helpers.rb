# frozen_string_literal: true

module Unit
  module SessionHelpers
    def create_user
      @organisation = create(:organisation_setting)
      update_organisation_db_settings
      add_license_key
      @user = create(:admin_user)
    end

    def create_user_with_permissions(role, action, table)
      create_user
      add_role_to_user(role)
      add_permission_to_role(action, table)
    end

    def add_license_key
      cache_key = "license-#{OrganisationSetting.last.license_key}"
      Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
    end

    def update_organisation_db_settings
      @organisation.update!(
        target_database_name: ENV['DEMO_CLIENT_DB_NAME'],
        target_database_username: ENV['DEMO_CLIENT_DB_USER'],
        target_database_password: ENV['DEMO_CLIENT_DB_PASSWORD'],
        target_database_host: ENV['DEMO_CLIENT_DB_HOST'],
        target_database_port: ENV['DEMO_CLIENT_DB_PORT'],
        target_database_type: 'postgres'
      )
    end

    def add_role_to_user(_role)
      @role = create(:role, :sales)
      @user.roles << @role
    end

    def add_permission_to_role(_action, table)
      view_permission = create(:permission, subject_class: table)
      @role.permissions << view_permission
    end
  end
end

RSpec.configure do |config|
  config.include Unit::SessionHelpers
end
