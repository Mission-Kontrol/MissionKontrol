# frozen_string_literal: true

feature 'Adding records with sufficient permissions', js: true do
  background do
    sign_in_admin_user_with_full_permissions('attending_events')
  end

  scenario 'with a single record selected creates the record' do
    find('.table--add-record-button').click
    fill_in 'record[event_id]', with: 5
    fill_in 'record[user_id]', with: 7
    click_button 'Save'
    expect(page).to have_content('Record has been successfully created.')
  end
end

feature 'Adding records without sufficient permissions', js: true do
  background do
    sign_in_admin_user_with_single_permissions('attending_events', :view)
  end

  scenario 'user cannot see the add option' do
    expect(page).not_to have_content('.table--add-record-button')
  end
end
