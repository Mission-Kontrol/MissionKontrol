class AddUniqueConstraintToTaskQueueOutcomes < ActiveRecord::Migration[5.1]
  def change
    add_index :task_queue_outcomes, [:outcome, :task_queue_id, :task_queue_item_primary_key], unique: true, name: 'task_queue_item_unique'
  end
end
