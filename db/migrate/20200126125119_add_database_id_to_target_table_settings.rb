class AddDatabaseIdToTargetTableSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :target_table_settings, :database_id, :integer
  end
end
