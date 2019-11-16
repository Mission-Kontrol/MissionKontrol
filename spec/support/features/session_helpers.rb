# frozen_string_literal: true

module Features
  module SessionHelpers
    def sign_in_as_admin_with_license
      @organisation = create(:organisation_setting)
      update_organisation_db_settings
      add_license_key
      user = create(:admin_user)
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'password'
      click_button 'Log in'
    end

    def sign_in_as_user_with_license
      @organisation = create(:organisation_setting)
      update_organisation_db_settings
      add_license_key
      @user = create(:admin_user)
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
        target_database_name: ENV['DEMO_CLIENT_DB_NAME'],
        target_database_username: ENV['DEMO_CLIENT_DB_USER'],
        target_database_password: ENV['DEMO_CLIENT_DB_PASSWORD'],
        target_database_host: ENV['DEMO_CLIENT_DB_HOST'],
        target_database_port: ENV['DEMO_CLIENT_DB_PORT'],
        target_database_type: 'postgres'
      )
    end
  end
end

RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
end
