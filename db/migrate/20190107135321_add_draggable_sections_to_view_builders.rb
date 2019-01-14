class AddDraggableSectionsToViewBuilders < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :draggable_fields_header_container, :jsonb, default: []
    add_column :view_builders, :draggable_fields_side_container, :jsonb, default: []
    add_column :view_builders, :draggable_fields_main_container, :jsonb, default: []
  end
end
