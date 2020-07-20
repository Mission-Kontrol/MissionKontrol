# frozen_string_literal: true

# TODO: figure out how to do these without sleep 10?
feature 'Setting permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('transactions')
    create(:target_table_setting, name: @table, database_id: @database.id)
    visit permissions_path
  end

  scenario 'enabling all permissions via tooltip on a database' do
    remove_all_permissions_from_role(@admin, 'transactions')
    find('.accordion').click
    find('.tooltipster-tooltip[data-role="Admin"]').click
    find('a.permissions-enable-all[data-role="Admin"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
  end

  scenario 'disable all permissions via tooltip on a database if already enabled' do
    give_role_all_permissions(@user_role, 'transactions')
    find('.accordion').click
    find('.tooltipster-tooltip[data-role="User"]').click
    find('a.permissions-disable-all[data-role="User"]').click
    expect(page.first('.tooltipster-tooltip[data-role="User"]')['src']).to have_content '/assets/images/icons/circle-with-cross.png'
  end

  scenario 'enabling second set of permissions via tooltip after enabling first set' do
    remove_all_permissions_from_role(@admin, 'transactions')
    remove_all_permissions_from_role(@user_role, 'transactions')
    find('.accordion').click
    find('.tooltipster-tooltip[data-role="Admin"]').click
    find('a.permissions-enable-all[data-role="Admin"]').click
    find('.tooltipster-tooltip[data-role="User"]').click
    find('a.permissions-enable-all[data-role="User"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
    expect(page.first('.tooltipster-tooltip[data-role="User"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
  end
end

feature 'Setting granular permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('transactions')
    create(:target_table_setting, name: @table, database_id: @database.id)
  end

  scenario 'opening grandular permissions when all are enabled for a role' do
    give_role_all_permissions(@user_role, 'transactions')
    visit permissions_path
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="User"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="User"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="User"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="User"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="User"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
  end

  scenario 'opening granular permissins when all are disabled for a role' do
    visit permissions_path
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-cross.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
  end

  scenario 'opening granular permissions when half are enabled for a role' do
    give_role_single_permission(@editor, 'transactions', 'view')
    visit permissions_path
    find('.accordion').click
    find('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Editor"]')['src']).to have_content '/assets/images/icons/circle-with-contrast.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Editor"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Editor"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Editor"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
    expect(page.first('.permissions--nested-table-data > img[data-role="Editor"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-checkbox-empty.svg'
  end
end

feature 'Granular permissions with multi databases', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('transactions')
    create_second_database
    create(:target_table_setting, name: @table, database_id: @database.id)
    create(:target_table_setting, name: @second_table, database_id: @second_database.id)
    visit permissions_path
  end

  scenario 'setting table to enabled automatically checks all CRUD boxes' do
    first('.accordion').click
    first('.tooltipster-tooltip').click
    find('a.permissions-enable-all[data-role="Admin"]').click
    sleep 5
    first('td.sorting_1').click
    expect(page.first('.tooltipster-tooltip[data-role="Admin"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="create"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="edit"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Admin"][data-action="delete"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
  end

  scenario 'setting single CRUD action to true changes the circle icon' do
    first('.accordion').click
    first('td.sorting_1').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="view"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Editor"]')['src']).to have_content '/assets/images/icons/circle-with-contrast.png'
  end

  scenario 'setting a non view CRUD action automatically selects view as well' do
    first('.accordion').click
    first('td.sorting_1').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="edit"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Editor"]')['src']).to have_content '/assets/images/icons/circle-with-contrast.png'
    expect(page.first('.permissions--nested-table-data > img[data-role="Editor"][data-action="view"]')['src']).to have_content '/assets/images/icons/black-check-box-with-white-check.png'
  end

  scenario 'selecting all CRUD actions changes the circle icon' do
    first('.accordion').click
    first('td.sorting_1').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="edit"]').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="create"]').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="delete"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Editor"]')['src']).to have_content '/assets/images/icons/circle-with-check-symbol.png'
  end

  scenario 'removing a single CRUD action from fully enabled table changes the circle icon' do
    give_role_all_permissions(@editor, 'transactions')
    first('.accordion').click
    first('td.sorting_1').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="edit"]').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="create"]').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="delete"]').click
    first('.permissions--nested-table-data > img[data-role="Editor"][data-action="view"]').click
    expect(page.first('.tooltipster-tooltip[data-role="Editor"]')['src']).to have_content '/assets/images/icons/circle-with-cross.png'
  end
end

feature 'Permissions', js: true do
  background do
    sign_in_as_user_with_license
    setup_tables_and_roles('transactions')
    @user.roles << @editor
    create(:target_table_setting, name: 'transactions', database_id: @database.id)
  end

  scenario 'user with Editor role with permissions to view table can view table page' do
    give_role_all_permissions(@editor, 'transactions')
    visit table_path(id: @database.id, table: 'transactions')
    expect(page).to have_current_path(table_path(id: @database.id, table: 'transactions'))
  end

  scenario 'user with Editor role without permissions to view table cannot view table page' do
    remove_all_permissions_from_role(@editor, 'transactions')
    visit table_path(id: @database.id, table: 'transactions')
    expect(page).to have_current_path(dashboard_path)
  end
end
