# frozen_string_literal: true

feature 'Modifying Table settings', js: true do
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

  scenario 'editing editable and mandatory settings' do
    wait_for_ajax
    find('.table--settings').click
    select "No", :from => "[editable_fields][event_id][editable]"
    click_button 'Save'
    visit table_path(id: @database.id, table: 'attending_events')
    wait_for_ajax
    first('.data-table--select-input').click
    find('.filter-bar--edit > .white').click
    expect(page).not_to have_content("input[name$='[user_id]']")
  end
end

feature 'Modifying table settings without sufficient permissions', js: true do
  background do
    sign_in_as_admin_with_license
    setup_tables_and_roles('attending_events')
    create(:target_table_setting, name: @table, database_id: @database.id)
    give_role_single_permission(@user.roles.first, 'attending_events', :view)
    visit table_path(id: @database.id, table: 'attending_events')
  end

  scenario 'user cannot see the add option' do
    wait_for_ajax
    expect(page).not_to have_content('.table--settings')
  end
end
