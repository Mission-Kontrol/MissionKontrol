class AddFieldsToRoles < ActiveRecord::Migration[5.1]
  def change
    add_column :roles, :administrator, :boolean
    add_column :roles, :editor, :boolean
    add_column :roles, :export, :boolean
    add_column :roles, :export_limit, :integer
  end
end
