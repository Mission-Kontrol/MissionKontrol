class CreateWorkLists < ActiveRecord::Migration[5.1]
  def change
    create_table :work_lists do |t|
      t.string :name, null: false
      t.text :details
      t.jsonb :sql_query, null: false, default: []
      t.timestamps null: false
    end
  end
end
