class CreateTaskQueues < ActiveRecord::Migration[5.1]
  def change
    create_table :task_queues do |t|
      t.string :name, null: false
      t.text :details
      t.string :table
      t.timestamps null: false
    end
  end
end
