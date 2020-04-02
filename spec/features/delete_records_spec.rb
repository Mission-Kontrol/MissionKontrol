# frozen_string_literal: true

feature 'Deleting records with sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_all_permissions(@user.roles.first, 'attending_events')
    visit table_path(id: @database.id, table: 'attending_events')
  end

  after do
    @database_connection = Kuwinda::UseCase::DatabaseConnection.new(@database).execute
    @target_db = Kuwinda::Repository::TargetDB.new(@database_connection)
    @target_db.create_record('attending_events', 'event_id' => '12', 'user_id' => '32')
    @target_db.create_record('attending_events', 'event_id' => '5', 'user_id' => '33')
  end

  xscenario 'with a single record selected deletes the record' do
    first('.data-table--select-input').click
    find('.filter-bar--delete > .white').click
    expect(page).to have_content('Record(s) successfully deleted.')
  end

  xscenario 'with a multiple records selected deletes the records' do
    checkboxes = page.all('.data-table--select-input')
    checkboxes[0].click
    checkboxes[1].click
    find('.filter-bar--delete > .white').click
    expect(page).to have_content('Record(s) successfully deleted.')
  end
end

feature 'Deleting records without sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_single_permission(@user.roles.first, 'attending_events', :view)
    visit table_path(id: @database.id, table: 'attending_events')
  end

  xscenario 'user cannot see the delete option' do
    first('.data-table--select-input').click
    expect(page).not_to have_content('.filter-bar--delete > .white')
  end
end
