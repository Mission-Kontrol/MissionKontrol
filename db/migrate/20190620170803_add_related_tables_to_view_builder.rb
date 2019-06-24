class AddRelatedTablesToViewBuilder < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :related_tables, :jsonb, default: []
  end
end
