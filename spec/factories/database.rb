# frozen_string_literal: true

FactoryBot.define do
  factory :database do
    friendly_name { 'Test Company' }
    adapter { 'postgresql' }
    host { ENV['DEMO_CLIENT_DB_HOST'] }
    port { 5432 }
    name { ENV['DEMO_CLIENT_DB_NAME'] }
    username { ENV['DEMO_CLIENT_DB_USER'] }
    password { ENV['DEMO_CLIENT_DB_PASSWORD'] }
  end
end
