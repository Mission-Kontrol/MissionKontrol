class AddDatabaseIdToViewBuilders < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :database_id, :integer
  end
end
