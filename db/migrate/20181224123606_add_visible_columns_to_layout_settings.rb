class AddVisibleColumnsToLayoutSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :layout_settings, :visible_columns, :jsonb, default: []
  end
end
