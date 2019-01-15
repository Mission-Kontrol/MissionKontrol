class RenameDraggableContainersOnViewBuilders < ActiveRecord::Migration[5.1]
  def change
    remove_column :view_builders, :draggable_fields_header_container
    remove_column :view_builders, :draggable_fields_main_container
    add_column :view_builders, :draggable_fields_header_container1, :jsonb, default: []
    add_column :view_builders, :draggable_fields_header_container2, :jsonb, default: []
    add_column :view_builders, :draggable_fields_main_container1, :jsonb, default: []
    add_column :view_builders, :draggable_fields_main_container2, :jsonb, default: []
    add_column :view_builders, :draggable_fields_main_container3, :jsonb, default: []
  end
end
