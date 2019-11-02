# frozen_string_literal: true

feature 'Permissions' do
  background do
    sign_in_as_user_with_license
    give_user_sales_role
    give_sales_role_permissions_to_view_events_table
    connect_to_target_database
  end

  scenario 'user with sales role with permissions to view table can view table navigation' do
    visit root_path
    then_i_expect_to_view_the_events_table_navigation
    remove_connection_to_target_database
  end

  scenario 'user with sales role with permissions to view table can view table page' do
    visit root_path
    click_link 'Events'
    then_i_expect_to_view_the_events_table_page
    remove_connection_to_target_database
  end
end

def give_user_sales_role
  @sales_role = create(:role, :sales)
  @user.roles << @sales_role
end

def give_sales_role_permissions_to_view_events_table
  view_permission = create(:permission)
  @sales_role.permissions << view_permission
end

def then_i_expect_to_view_the_events_table_navigation
  expect(page).to have_link('Events')
end

def then_i_expect_to_view_the_events_table_page
  expect(page).to have_current_path(table_path(table: 'events', id: 'events'))
end