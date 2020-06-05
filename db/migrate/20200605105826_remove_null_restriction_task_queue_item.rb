class RemoveNullRestrictionTaskQueueItem < ActiveRecord::Migration[5.2]
  def change
    change_column :task_queue_outcomes, :task_queue_item_reappear_at, :datetime, null: true
  end
end
