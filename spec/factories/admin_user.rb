# frozen_string_literal: true

FactoryBot.define do
  factory :admin_user do
    email { FFaker::Internet.email }
    password { 'password' }
    password_confirmation { 'password' }
    active { true }
  end
end
