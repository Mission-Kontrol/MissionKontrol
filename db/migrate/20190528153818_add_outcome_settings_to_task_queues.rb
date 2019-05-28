class AddOutcomeSettingsToTaskQueues < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queues, :success_outcome_title, :string
    add_column :task_queues, :success_outcome_timeout, :string
    add_column :task_queues, :failure_outcome_title, :string
    add_column :task_queues, :failure_outcome_timeout, :string
  end
end
