require 'rails_helper'

RSpec.feature 'Admin views a table', type: :feature do
  let(:admin) do
    AdminUser.first_or_create(email: 'test@test.com', password: '123456', password_confirmation: '123456')
  end

  before do
    delete_layout_for_users
  end

  scenario 'navigating to a table will show the selected table' do
    log_in_as_admin
    when_i_click_the_users_link
    then_i_expect_to_be_redirected_to_the_users_table
  end
end

def log_in_as_admin
  visit root_path
	email = "test@test.com"
	fill_in 'admin_user_email', :with => email
	fill_in 'admin_user_password', :with => "123456"
	click_button 'Log in'
end

def delete_layout_for_users
  ViewBuilder.where(table_name: "users").delete_all
end

def when_i_click_the_users_link
  within('#side-menu') do
    click_link 'users'
  end
end

def then_i_expect_to_be_redirected_to_the_users_table
  expect(page).to have_current_path(table_path(id: "users", table: "users"))
end
