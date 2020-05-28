class AddEnabledFieldToTaskQueue < ActiveRecord::Migration[5.2]
  def change
    add_column :task_queues, :enabled, :boolean, default: true
  end
end
