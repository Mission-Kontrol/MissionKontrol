# frozen_string_literal: true

module Features
  module SessionHelpers
    def sign_in_as_admin
      user = AdminUser.find_by_email('test@kuwinda.io') || AdminUser.create(email: 'test@kuwinda.io', password: '123456', password_confirmation: '123456')
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: '123456'
      click_button 'Log in'
    end
  end
end

RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
end
