class AddRawSqlToTaskQueues < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queues, :raw_sql, :string
  end
end
