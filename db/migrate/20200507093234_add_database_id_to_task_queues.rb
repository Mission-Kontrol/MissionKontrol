class AddDatabaseIdToTaskQueues < ActiveRecord::Migration[5.2]
  def change
    add_column :task_queues, :database_id, :integer
  end
end
