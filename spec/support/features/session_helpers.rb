# frozen_string_literal: true

module Features
  module SessionHelpers
    def sign_in_as_admin_with_license
      create(:organisation_setting)
      user = create(:admin_user)
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'password'
      click_button 'Log in'
    end
  end
end

RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
end
