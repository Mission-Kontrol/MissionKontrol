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

feature 'Entering License Key' do
  background do
    allow(AdminUser).to receive(:any?).and_return(false)
  end

  scenario 'with a valid license key' do
    visit root_path
    VCR.use_cassette('license_key/activation_success') do
      VCR.use_cassette('license_key/validation_success') do
        fill_in 'License key', with: 'wcCXJZ5fd3TdekwrB5No912UO2-26'
        click_button 'Submit'
      end
    end
    expect(page).to have_current_path(new_admin_user_registration_path)
  end
end

xfeature 'Creating an Admin User' do
  background do
    create(:organisation_setting)
  end

  scenario 'when valid license key present' do
    add_license_key
    visit root_path
    within('#new_admin_user') do
      fill_in 'First name', with: 'Test'
      fill_in 'Last name', with: 'User'
      fill_in 'Email', with: 'test_user@example.com'
      fill_in 'Password', with: 'password'
      fill_in 'Password confirmation', with: 'password'
    end
    click_button 'Submit'
    expect(page).to have_content('Welcome! You have signed up successfully')
    expect(page).to have_current_path(dashboard_path)
    binding.pry
  end
end

def add_license_key
  cache_key = "license-#{OrganisationSetting.last.license_key}"
  Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
end
