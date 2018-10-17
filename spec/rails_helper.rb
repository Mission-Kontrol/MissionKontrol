# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is in production mode!') if Rails.env.production?
require 'rspec/rails'

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

  config.before(:suite) do
    DatabaseCleaner[:active_record,
                    { connection: :test }].strategy = :transaction
    DatabaseCleaner[:active_record,
                    { connection: :test }].clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner[:active_record, { connection: :test }].cleaning do
      example.run
    end
  end
end
