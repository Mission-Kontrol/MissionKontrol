# frozen_string_literal: true

feature 'Admin views a table', type: :feature do
  before do
    delete_layout_for_users
  end

  xscenario 'clicking on a table will show the selected table' do
    VCR.use_cassette('license_key/validation_success') do
      sign_in_as_admin_with_license
      when_i_click_the_users_link
    end

    then_i_expect_to_be_redirected_to_the_users_table
  end
end

def delete_layout_for_users
  ViewBuilder.where(table_name: 'users').delete_all
end

def when_i_click_the_users_link
  within('#side-menu') do
    click_link 'users'
  end
end

def then_i_expect_to_be_redirected_to_the_users_table
  expect(page).to have_current_path(table_path(id: 'users', table: 'users'))
end
