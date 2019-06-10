class CreateTaskQueueOutcomes < ActiveRecord::Migration[5.1]
  def change
    create_table :task_queue_outcomes do |t|
      t.integer :task_queue_id, null: false
      t.string :task_queue_item_table, null: false
      t.string :task_queue_item_primary_key, null: false
      t.datetime :task_queue_item_reappear_at, null: false
    end
  end
end
