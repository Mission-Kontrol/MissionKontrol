# frozen_string_literal: true

feature 'Editing records with sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    editable_fields = {
      id: { editable: false, reference: '' },
      user_id: { editable: true, reference: '', mandatory: true },
      event_id: { editable: true, reference: '', mandatory: false },
      created_at: { editable: false, reference: '' },
      updated_at: { editable: false, reference: '' }
    }
    create(:target_table_setting, name: @table, database_id: @database.id, nested_table: nil, editable_fields: editable_fields)
    give_role_all_permissions(@user.roles.first, 'attending_events')
    visit table_path(id: @database.id, table: 'attending_events')
  end

  scenario 'with a single record selected edits the record' do
    wait_for_ajax
    first('.data-table--select-input').click
    find('.filter-bar--edit > .white').click
    find("input[name$='[event_id]']").set(5)
    find("input[name$='[user_id]']").set(7)
    click_button 'Save'
    expect(page).to have_content('Record(s) has been successfully updated.')
  end

  scenario 'with multiple records selected edits both records' do
    wait_for_ajax
    first('.data-table--select-input').click
    all('.data-table--select-input')[2].click
    find('.filter-bar--edit > .white').click
    all("input[name$='[event_id]']")[0].set(5)
    all("input[name$='[user_id]']")[0].set(7)
    all("input[name$='[event_id]']")[1].set(4)
    all("input[name$='[user_id]']")[1].set(6)
    click_button 'Save'
    expect(page).to have_content('Record(s) has been successfully updated.')
  end
end

feature 'Editing records without sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_single_permission(@user.roles.first, 'attending_events', :view)
    visit table_path(id: @database.id, table: 'attending_events')
  end

  scenario 'user cannot see the edit option' do
    wait_for_ajax
    first('.data-table--select-input').click
    expect(page).not_to have_content('.filter-bar--edit > .white')
  end
end
