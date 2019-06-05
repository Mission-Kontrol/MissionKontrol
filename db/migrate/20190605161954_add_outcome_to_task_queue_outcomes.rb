class AddOutcomeToTaskQueueOutcomes < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queue_outcomes, :outcome, :string, null: false
  end
end
