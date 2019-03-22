require 'rails_helper'

RSpec.feature 'Admin views a table without a layout', type: :feature, js: true do
  let(:admin) do
    AdminUser.first_or_create(email: 'test@test.com', password: '123456', password_confirmation: '123456')
  end

  before do
    delete_layout_for_users
  end

  scenario 'navigating to a table item without a layout will redirect to the layout builder' do
    log_in_as_admin
    then_click_the_users_link
    when_i_click_the_first_user
    then_i_expect_to_be_redirected_to_the_layout_builder
  end
end

def delete_layout_for_users
  ViewBuilder.where(table_name: "users").delete_all
end

def log_in_as_admin
  visit root_path
	email = "test@test.com"
	fill_in 'admin_user_email', :with => email
	fill_in 'admin_user_password', :with => "123456"
	click_button 'Log in'
end

def then_click_the_users_link
  click_link 'users'

  # within('#side-menu') do
  # end
end

def when_i_click_the_first_user
  within('.table') do
    first('tbody > tr').click
  end
end

def then_i_expect_to_be_redirected_to_the_layout_builder
  expect(page).to have_current_path(new_layout_path)
end
