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
    create_admin
    create_roles('Sales')
    create_roles('Team Lead')
  end
end

def create_admin
  Role.create!(
    name: 'Admin',
    administrator: true,
    editor: true,
    export: true,
    export_limit: 0
  )
end

def create_roles(role)
  Role.create!(
    name: role,
    administrator: false,
    editor: false,
    export: false,
    export_limit: nil
  )
end
