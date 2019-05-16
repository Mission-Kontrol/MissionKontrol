class AddQueryBuilderRulesToTaskQueues < ActiveRecord::Migration[5.1]
  def change
    add_column :task_queues, :query_builder_rules, :jsonb, default: []
  end
end
