# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is in production mode!') if Rails.env.production?
require 'rspec/rails'
require 'capybara'
require 'selenium/webdriver'
require 'capybara-screenshot/rspec'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.backtrace_exclusion_patterns = [
    %r{gems\/activesupport},
    %r{gems\/actionpack},
    %r{gems\/rspec}
  ]

  config.use_transactional_fixtures = false
  # config.before(:each) do
  #   DatabaseCleaner.strategy = :truncation, { only: %w[admin_users organisation_settings] }
  # end

  # config.before(:each) do
  #   DatabaseCleaner.start
  # end

  config.after(:each) do
    AdminUser.all.each(&:delete)
    OrganisationSetting.all.each(&:delete)
    Role.all.each(&:delete)
    Permission.all.each(&:delete)
    ViewBuilder.all.each(&:delete)
    TargetTableSetting.all.each(&:delete)
    DataTableState.all.each(&:delete)
    Database.all.each(&:delete)
    # DatabaseCleaner.clean
  end

  config.infer_spec_type_from_file_location!
  config.default_formatter = 'doc' if config.files_to_run.one?

  config.before do
    ActionMailer::Base.deliveries.clear
    I18n.locale = :en
  end

  config.include FactoryBot::Syntax::Methods
  config.include Devise::Test::ControllerHelpers, type: :controller
end

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: { args: %w[headless disable-gpu no-sandbox] }
  )

  Capybara::Selenium::Driver.new app,
                                 browser: :chrome,
                                 desired_capabilities: capabilities
end

Capybara.raise_server_errors = false

Capybara.javascript_driver = :headless_chrome

Capybara.add_selector(:id) do
  xpath { |id| XPath.descendant[XPath.attr(:id) == id.to_s] }
end
