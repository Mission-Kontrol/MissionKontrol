class RemoveUniqueConstraintTaskQueueIndex < ActiveRecord::Migration[6.1]
  def change
    remove_index :task_queue_outcomes, [:task_queue_id, :task_queue_item_primary_key]

    add_index :task_queue_outcomes, [:task_queue_id, :task_queue_item_primary_key], name: 'task_queue_item_index'
  end
end
