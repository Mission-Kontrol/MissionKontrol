class AddSqlFiltersToWorkLists < ActiveRecord::Migration[5.1]
  def change
    add_column :work_lists, :sql_filters, :jsonb, default: []
  end
end
