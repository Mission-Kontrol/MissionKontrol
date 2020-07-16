# frozen_string_literal: true

feature 'Editing records with sufficient permissions', js: true do
  background do
    sign_in_admin_user_with_complete_table_settings('attending_events')
  end

  scenario 'with a single record selected edits the record' do
    first('.data-table--select-input').click
    find('.filter-bar--edit > .white').click
    find("input[name$='[transaction_id]']").set(5)
    find("input[name$='[user_id]']").set(7)
    click_button 'Save'
    expect(page).to have_content('Record(s) has been successfully updated.')
  end

  scenario 'with multiple records selected edits both records' do
    first('.data-table--select-input').click
    all('.data-table--select-input')[2].click
    find('.filter-bar--edit > .white').click
    all("input[name$='[transaction_id]']")[0].set(5)
    all("input[name$='[user_id]']")[0].set(7)
    all("input[name$='[transaction_id]']")[1].set(4)
    all("input[name$='[user_id]']")[1].set(6)
    click_button 'Save'
    expect(page).to have_content('Record(s) has been successfully updated.')
  end
end

feature 'Editing records without sufficient permissions', js: true do
  background do
    sign_in_admin_user_with_single_permissions('attending_events', :view)
  end

  scenario 'user cannot see the edit option' do
    first('.data-table--select-input').click
    expect(page).not_to have_content('.filter-bar--edit > .white')
  end
end
