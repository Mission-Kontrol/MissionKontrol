class AddDraggableFieldsToTaskQueues < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queues, :draggable_fields, :jsonb, default: []
  end
end
