# frozen_string_literal: true

# TODO: figure out how to do these without sleep 10?

feature 'Permissions', js: true do
  background do
    sign_in_as_user_with_license
    @database = create(:database)
    create(:target_table_setting, name: 'events')
  end

  scenario 'user with sales role with permissions to view table can view table navigation' do
    give_sales_role_permissions_to_view_events_table
    find("a[id='nav-link-for-available-databases']").click
    find("a[data-database-id='#{@database.id}']").click
    sleep 10
    expect(page).to have_link('events')
  end

  scenario 'user with sales role with permissions to view table can view table page' do
    give_sales_role_permissions_to_view_events_table
    visit table_path(id: @database.id, table: 'events')
    expect(page).to have_current_path(table_path(id: @database.id, table: 'events'))
  end

  scenario 'user with sales role without permissions to view table cannot view table navigation' do
    find("a[id='nav-link-for-available-databases']").click
    find("a[data-database-id='#{@database.id}']").click
    sleep 10
    expect(page).not_to have_link('events')
  end

  scenario 'user with sales role without permissions to view table cannot view table page' do
    visit table_path(id: @database.id, table: 'events')
    expect(page).to have_current_path(dashboard_path)
  end
end

def give_sales_role_permissions_to_view_events_table
  view_permission = create(:permission, subject_id: @database.id)
  @role.permissions << view_permission
end
