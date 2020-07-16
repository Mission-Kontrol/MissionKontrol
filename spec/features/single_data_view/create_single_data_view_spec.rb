# frozen_string_literal: true

feature 'Creating single data view', js: true do
  background do
    sign_in_as_admin_with_license

    setup_tables_and_roles('transactions')
    visit layouts_path
  end

  scenario 'shows modal with video' do
    first('.accordion').click
    click_link 'Add new'
    expect(page).to have_content 'Welcome to MissionKontrol - We’re going to start by building a layout'
  end

  scenario 'does not show modal with video when marked as ignore' do
    @user.ignore_layout_modal = true
    @user.save!

    first('.accordion').click
    click_link 'Add new'
    expect(page).to have_content 'Bring your new layout to life'
  end

  scenario 'creates a new layout with primary table fields visible' do
    @view_builder = ViewBuilder.create(table_name: 'transactions', database_id: @database.id)
    visit edit_layout_path(@view_builder.id)
    find('.sv_builder_table_navigation').click
    expect(page).to have_content 'area'
    expect(page).to have_selector :css, '.layout-builder-draggable-item-handle'
  end

  scenario 'creates a new layout with related table fields visible' do
    @view_builder = ViewBuilder.create(table_name: 'transactions', database_id: @database.id)
    visit edit_layout_path(@view_builder.id)
    expect(page).to have_selector :css, '.draggable-list-for-relatable-table'
  end
end
