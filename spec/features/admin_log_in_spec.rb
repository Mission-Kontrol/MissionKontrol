# frozen_string_literal: true

feature 'User login', js: true do
  scenario 'when user is active' do
    sign_in_as_user_with_license
    expect(page).to have_current_path(dashboard_path)
  end

  scenario 'when user is inactive' do
    create_org_with_license
    @user = create(:admin_user, active: false)
    sign_in_user
    expect(page).to have_current_path(new_admin_user_session_path)
    expect(page).to have_content "Your account is not active. Please speak to an Administrator."
  end
end
