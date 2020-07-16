# frozen_string_literal: true

feature 'Modifying Table settings', js: true do
  background do
    sign_in_admin_user_with_complete_table_settings('attending_events')
  end

  scenario 'editing editable and mandatory settings' do
    find('.table--settings').click
    select 'No', from: '[editable_fields][transaction_id][editable]'
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
    sign_in_admin_user_with_single_permissions('attending_events', :view)
  end

  scenario 'user cannot see the add option' do
    expect(page).not_to have_content('.table--settings')
  end
end
