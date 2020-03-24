# frozen_string_literal: true

module Features
  module SessionHelpers
    def create_org_with_license
      @organisation = create(:organisation_setting)
      update_organisation_db_settings
      add_license_key
    end

    def sign_in_as_admin_with_license
      create_org_with_license
      @role = create(:role, name: 'Admin', administrator: true)
      @user = create(:admin_user)
      @user.roles << @role
      sign_in_user
    end

    def sign_in_as_user_with_license
      create_org_with_license
      @role = create(:role)
      @user = create(:admin_user)
      @user.roles << @role
      sign_in_user
    end

    def sign_in_user
      visit root_path
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: 'password'
      click_button 'Log in'
    end

    def add_license_key
      cache_key = "license-#{OrganisationSetting.last.license_key}"
      Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
    end

    def update_organisation_db_settings
      @organisation.update!(
        target_database_name: 'kuwinda_test',
        target_database_username: ENV['KUWINDA_DATABASE_USER'],
        target_database_password: ENV['KUWINDA_DATABASE_PASSWORD'],
        target_database_host: ENV['KUWINDA_DATABASE_HOST'],
        target_database_port: 5432,
        target_database_type: 'postgres'
      )
    end

    def give_sales_role_permissions_to_view_events_table
      view_permission = create(:permission, subject_id: @database.id)
      @role.permissions << view_permission
    end
    
    def create_action_permissions(table)
      %w[view create edit delete].each do |action|
        next if Permission.find_by(subject_id: @database.id, subject_class: table, action: action)
    
        Permission.create!(subject_id: @database.id, subject_class: table, action: action)
      end
    end
    
    def give_role_all_permissions(role, table)
      permissions = Permission.where(subject_id: @database.id, subject_class: table)
      role.permissions << permissions
    end
    
    def give_role_single_permission(role, table, action)
      permission = Permission.find_by(subject_id: @database.id, subject_class: table, action: action)
    
      role.permissions << permission
    end
    
    def setup_tables_and_roles(table)
      @database = create(:database)
      @table = table
      @sales = create(:role, name: 'Sales')
      @team_lead = create(:role, name: 'Team Lead')
      create_action_permissions(@table)
    end
    
    def create_second_database
      @second_database = create(:database)
      @second_table = 'users'
      create_action_permissions(@second_table)
    end
  end
end

RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
end
