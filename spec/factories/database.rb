# frozen_string_literal: true

FactoryBot.define do
  factory :database do
    friendly_name { 'Test Company' }
    adapter { 'postgresql' }
    host { 'localhost' }
    port { 5432 }
    name { 'name' }
    username { 'username' }
    password { 'password' }
  end
end
