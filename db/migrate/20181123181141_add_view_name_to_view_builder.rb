class AddViewNameToViewBuilder < ActiveRecord::Migration[5.1]
  def self.up
    add_column :view_builders, :view_name, :string, required: true
    add_column :view_builders, :status, :string, required: true, default: 'pending'
  end

  def self.down
    remove_column :view_builders, :view_name
    remove_column :view_builders, :status
  end
end
