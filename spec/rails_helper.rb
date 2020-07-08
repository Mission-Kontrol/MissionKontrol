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

  DATABASE = YAML.load_file(File.join(Rails.root, "config", "database.yml"))[Rails.env]

  # config.use_transactional_fixtures = false
  # config.before(:each) do
  #   # ActiveRecord::Base.establish_connection DATABASE
  #   DatabaseCleaner.clean_with(:truncation)
  #   # DatabaseCleaner.strategy = :truncation, { only: %w[admin_users organisation_settings] }
  # end

  # config.before(:each) do
  #   # ActiveRecord::Base.establish_connection DATABASE
  #   DatabaseCleaner.strategy = :transaction
  #   DatabaseCleaner.start
  #   # DatabaseCleaner.start
  # end

  # config.append_after(:each) do
  #   # ActiveRecord::Base.establish_connection DATABASE
  #   DatabaseCleaner.clean
  #   # DatabaseCleaner.clean
  # end

  config.after(:each) do
    ActiveRecord::Base.connection_pool.disconnect!
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[:test])
    # ActiveRecord::Base.establish_connection DATABASE
    AdminUser.all.each(&:delete) if AdminUser.all
    OrganisationSetting.all.each(&:delete) if OrganisationSetting.all
    Role.all.each(&:delete) if Role.all
    Permission.all.each(&:delete) if Permission.all
    ViewBuilder.all.each(&:delete) if ViewBuilder.all
    TargetTableSetting.all.each(&:delete) if TargetTableSetting.all
    DataTableState.all.each(&:delete) if DataTableState.all
    Database.all.each(&:delete) if Database.all
    TaskQueue.all.each(&:delete) if TaskQueue.all
    WorkList.all.each(&:delete) if WorkList.all
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

Capybara.default_max_wait_time = 5

Capybara.add_selector(:id) do
  xpath { |id| XPath.descendant[XPath.attr(:id) == id.to_s] }
end
