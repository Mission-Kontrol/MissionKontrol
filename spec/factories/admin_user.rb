# frozen_string_literal: true

FactoryBot.define do
  factory :admin_user do
    email { FFaker::Internet.email }
    password { 'password' }
    password_confirmation { 'password' }

    trait :with_license do
      activation_id { '1558260633' }
      license_key { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
    end
  end
end
