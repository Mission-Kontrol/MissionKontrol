class AddQueryBuilderSqlToTaskQueues < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queues, :query_builder_sql, :string
  end
end
