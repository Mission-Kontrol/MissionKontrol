class AddDataTableNameToWorkLists < ActiveRecord::Migration[5.1]
  def change
    add_column :work_lists, :data_table_name, :string
  end
end
