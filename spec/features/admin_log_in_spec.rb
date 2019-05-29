feature 'Admin user logs in to the app' do
  xscenario 'viewing the admin dashboard' do
    when_i_log_in_as_an_admin_user
    then_i_expect_to_be_redirected_to_the_dashboard
  end
end

def when_i_log_in_as_an_admin_user
  VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
    sign_in_as_admin_with_license
  end
end

def then_i_expect_to_be_redirected_to_the_dashboard
  expect(page).to have_current_path(dashboard_path)
end
