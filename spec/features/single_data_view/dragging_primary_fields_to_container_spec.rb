# dragging to container
# dragging out of container (and refreshing?)
# dragging into trash

# frozen_string_literal: true

feature 'Dragging primary fields to container', js: true do
  background do
    sign_in_as_admin_with_license

    setup_tables_and_roles('events')
    @view_builder = ViewBuilder.create(table_name: 'events', database_id: @database.id)
    visit edit_layout_path(@view_builder.id)
    find('.sv_builder_table_navigation').click
  end

  scenario 'from field list into view container' do
    source = first('.layout-builder-draggable-item')
    destination = find('#layout-builder-draggable-main-container3')
    source.drag_to destination
    sleep 15
    binding.pry
  end

  scenario 'from view container into field list' do
  end

  scenario 'from view container into field list when list closed' do
  end

  scenario 'from field list into trash can' do
  end

  scenario 'from view container into trash can' do
  end

  scenario 'from view container into trash can when list closed' do
  end

  scenario 'creates a new layout with primary table fields visible' do
  end
end
