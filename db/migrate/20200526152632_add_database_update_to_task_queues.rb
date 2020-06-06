class AddDatabaseUpdateToTaskQueues < ActiveRecord::Migration[5.2]
  def change
    add_column :task_queues, :success_database_update, :jsonb
    add_column :task_queues, :failure_database_update, :jsonb
  end
end
