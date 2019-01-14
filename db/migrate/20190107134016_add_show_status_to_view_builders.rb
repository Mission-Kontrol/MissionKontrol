class AddShowStatusToViewBuilders < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :show_status, :boolean, default: false, null: false
  end
end
