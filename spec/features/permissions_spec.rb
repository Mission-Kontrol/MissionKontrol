# frozen_string_literal: true

# TODO: figure out how to do these without sleep 10?
feature 'Setting permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles
    create(:target_table_setting, name: @table, database_id: @database.id)
    visit permissions_path
  end

  scenario 'enabling all permissions via tooltip on a database' do
    find('.accordion').click
    first('.tooltipster-tooltip').click
    find('a.permissions-enable-all[data-role="Admin"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
  end

  scenario 'disable all permissions via tooltip on a database if already enabled' do
    give_role_all_permissions(@team_lead, 'events')
    find('.accordion').click
    find('.tooltipster-tooltip[data-role="Team Lead"]').click
    find('a.permissions-disable-all[data-role="Team Lead"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Team Lead"]')['src']).to have_content '/assets/images/icons/circle-with-cross.png'
  end

  scenario 'enabling second set of permissions via tooltip after enabling first set' do
    find('.accordion').click
    find('.tooltipster-tooltip[data-role="Admin"]').click
    find('a.permissions-enable-all[data-role="Admin"]').click
    find('.tooltipster-tooltip[data-role="Team Lead"]').click
    find('a.permissions-enable-all[data-role="Team Lead"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
    expect(page.first('.tooltipster-tooltip[data-role="Team Lead"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
  end
end

# rubocop:disable Metrics/BlockLength
feature 'Setting granular permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles
    create(:target_table_setting, name: @table, database_id: @database.id)
    visit permissions_path
  end

  scenario 'opening grandular permissions when all are enabled for a role' do
    give_role_all_permissions(@team_lead, 'events')
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Team Lead"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Team Lead"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Team Lead"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Team Lead"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Team Lead"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
  end

  scenario 'opening granular permissins when all are disabled for a role' do
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-cross.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
  end

  scenario 'opening granular permissions when half are enabled for a role' do
    give_role_single_permission(@sales, 'events', 'view')
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Sales"]')['src']).to have_content '/assets/images/icons/circle-with-contrast.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Sales"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Sales"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Sales"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Sales"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
  end
end
# rubocop:enable Metrics/BlockLength

feature 'Permissions', js: true do
  background do
    sign_in_as_user_with_license
    @database = create(:database)
    create(:target_table_setting, name: 'events', database_id: @database.id)
  end

  scenario 'user with sales role with permissions to view table can view table page' do
    give_sales_role_permissions_to_view_events_table
    visit table_path(id: @database.id, table: 'events')
    expect(page).to have_current_path(table_path(id: @database.id, table: 'events'))
  end

  scenario 'user with sales role without permissions to view table cannot view table page' do
    visit table_path(id: @database.id, table: 'events')
    expect(page).to have_current_path(dashboard_path)
  end

  xscenario 'user with sales role without permissions to view table cannot view table navigation' do
    find("a[id='nav-link-for-available-databases']").click
    find("a[data-database-id='#{@database.id}']").click
    # sleep 10
    expect(page).not_to have_link('events')
  end

  xscenario 'user with sales role with permissions to view table can view table in navigation' do
    give_sales_role_permissions_to_view_events_table
    find("a[id='nav-link-for-available-databases']").click
    find("a[data-database-id='#{@database.id}']").click
    # sleep 2
    expect(page).to have_link('events')
  end
end

def give_sales_role_permissions_to_view_events_table
  view_permission = create(:permission, subject_id: @database.id)
  @role.permissions << view_permission
end

def create_action_permissions(table)
  %w[view create edit delete].each do |action|
    next if Permission.find_by(subject_id: @database.id, subject_class: table, action: action)

    Permission.create!(subject_id: @database.id, subject_class: table, action: action)
  end
end

def give_role_all_permissions(role, table)
  permissions = Permission.where(subject_id: @database.id, subject_class: table)
  role.permissions << permissions
end

def give_role_single_permission(role, table, action)
  permission = Permission.find_by(subject_id: @database.id, subject_class: table, action: action)

  role.permissions << permission
end

def setup_tables_and_roles
  @database = create(:database)
  @table = 'events'
  @sales = create(:role, name: 'Sales')
  @team_lead = create(:role, name: 'Team Lead')
  create_action_permissions(@table)
end
