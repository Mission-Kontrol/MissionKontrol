# frozen_string_literal: true

feature 'Loading table with corrrect permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_all_permissions(@user.roles.first, 'events')
  end

  xscenario 'user with sales role with permissions to view table can view table page' do
    visit table_path(id: @database.id, table: 'events')
    expect(page).to have_content('Nairobi')
  end
end
