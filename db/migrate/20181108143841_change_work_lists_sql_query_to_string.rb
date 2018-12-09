class ChangeWorkListsSqlQueryToString < ActiveRecord::Migration[5.1]
  def change
    remove_column :work_lists, :sql_query
    add_column :work_lists, :sql_query, :string
  end
end
