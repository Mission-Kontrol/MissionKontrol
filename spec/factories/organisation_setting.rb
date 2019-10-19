# frozen_string_literal: true

FactoryBot.define do
  factory :organisation_setting do
    company_name { 'Test Company' }
    activation_id { '1559143878' }
    license_key { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
    full_license { false }
  end
end
