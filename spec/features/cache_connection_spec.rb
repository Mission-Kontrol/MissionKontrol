# frozen_string_literal: true

feature 'Loading table with corrrect permissions', js: true do
  # background do
  #   sign_in_as_admin_with_license
  #   setup_tables_and_roles('attending_events')
  #   create(:target_table_setting, name: @table, database_id: @database.id)
  #   give_role_all_permissions(@user.roles.first, 'attending_events')
  #   visit table_path(id: @database.id, table: 'attending_events')
  # end

  # scenario 'with a single record selected deletes the record' do
  #   expect(page).to have_content('Record(s) successfully deleted.')
  # end

  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_all_permissions(@user.roles.first, 'events')
    # sign_in_as_user_with_license
    # @database = create(:database)
    # create(:target_table_setting, name: 'events', database_id: @database.id)
  end

  scenario 'user with sales role with permissions to view table can view table page' do
    # give_sales_role_permissions_to_view_events_table
    visit table_path(id: @database.id, table: 'events')
    # binding.pry
    expect(page).to have_content('Nairobi')
    # expect(page).to have_current_path(table_path(id: @database.id, table: 'events'))
  end
end
