# frozen_string_literal: true

feature 'Installation' do
  background do
    allow(AdminUser).to receive(:any?).and_return(false)
    allow(OrganisationSetting).to receive(:any?).and_return(false)
  end

  scenario 'without a license key' do
    visit root_path
    expect(page).to have_current_path(license_path)
    expect(page).to have_content('You’ll need a license key to get set-up')
  end
end

feature 'License Key' do
  background do
    allow(AdminUser).to receive(:any?).and_return(false)
  end

  scenario 'entering a valid license key' do
    visit root_path
    VCR.use_cassette('license_key/activation_success') do
      VCR.use_cassette('license_key/validation_success') do
        fill_in 'License key', with: 'wcCXJZ5fd3TdekwrB5No912UO2-26'
        click_button 'Submit'
      end
    end
    expect(page).to have_current_path(new_admin_user_registration_path)
  end

  xscenario 'creating admin user' do
    add_license_key
    within('#user_form') do
      fill_in :email
      fill_in :password
    end
    click_button 'Save'
    expect(page).to have_content('well done')
    expect(page).to have_current_path(dashboard_path)
  end
end