class AddVisibleColumnsToWorkList < ActiveRecord::Migration[5.1]
  def change
    add_column :work_lists, :visible_columns, :jsonb, default: []
  end
end
