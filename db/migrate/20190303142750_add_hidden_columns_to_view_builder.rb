class AddHiddenColumnsToViewBuilder < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :hidden_columns, :jsonb, default: []
  end
end
