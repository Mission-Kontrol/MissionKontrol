class CreateTableViewBuilder < ActiveRecord::Migration[5.1]
  def change
    create_table :view_builders do |t|
      t.string :table_name, null: false
      t.jsonb :table_attributes, null: false, default: '{}'
    end
  end
end
