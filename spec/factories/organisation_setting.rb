# frozen_string_literal: true

FactoryBot.define do
  factory :organisation_setting do
    company_name { 'Test Company' }
    activation_id { '1559143878' }
    license_key { 'license_key' }
    full_license { false }
  end
end
