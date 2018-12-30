# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is in production mode!') if Rails.env.production?
require 'rspec/rails'
require 'selenium/webdriver'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.backtrace_exclusion_patterns = [
    %r{gems\/activesupport},
    %r{gems\/actionpack},
    %r{gems\/rspec}
  ]

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.default_formatter = 'doc' if config.files_to_run.one?

  config.before do
    ActionMailer::Base.deliveries.clear
    I18n.locale = :en
  end

  config.include FactoryBot::Syntax::Methods

  # config.before(:suite) do
  #   DatabaseCleaner[:active_record,
  #                   { connection: :test }].strategy = :transaction
  #   DatabaseCleaner[:active_record,
  #                   { connection: :test }].clean_with(:truncation)
  # end
  #
  # config.around(:each) do |example|
  #   # DatabaseCleaner.clean
  #   DatabaseCleaner.cleaning do
  #     example.run
  #   end
  # end
  #
  # config.after do
  #   DatabaseCleaner.clean
  # end

  # Clear/clean test DB every test
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
end
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
