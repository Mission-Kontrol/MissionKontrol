# frozen_string_literal: true

feature 'Adding records with sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_all_permissions(@user.roles.first, 'attending_events')
    visit table_path(id: @database.id, table: 'attending_events')
  end

  scenario 'with a single record selected creates the record' do
    wait_for_ajax
    find('.table--add-record-button').click
    fill_in 'record[event_id]', with: 5
    fill_in 'record[user_id]', with: 7
    click_button 'Save'
    expect(page).to have_content('Record has been successfully created.')
  end
end

feature 'Adding records without sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_single_permission(@user.roles.first, 'attending_events', :view)
    visit table_path(id: @database.id, table: 'attending_events')
  end

  scenario 'user cannot see the add option' do
    wait_for_ajax
    expect(page).not_to have_content('.table--add-record-button')
  end
end
