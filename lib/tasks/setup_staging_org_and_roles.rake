# frozen_string_literal: true
namespace :setup_org_and_roles do
  desc 'setup org'
  task setup_all: :environment do
    OrganisationSetting.create!(
      license_key: 'wcCXJZ5fd3TdekwrB5No912UO2-26',
      activation_id: '1559143878',
      full_license: false,
      company_name: 'Kuwinda Test'
    )
    Role.create!(
      name: 'Admin',
      administrator: true,
      editor: true,
      export: true,
      export_limit: 0
    )
    Role.create!(
      name: 'Sales',
      administrator: false,
      editor: false,
      export: false,
      export_limit: nil
    )
    Role.create!(
      name: 'Team Lead',
      administrator: false,
      editor: false,
      export: false,
      export_limit: nil
    )
  end
end
