class CreateDataTableStates < ActiveRecord::Migration[5.1]
  def change
    create_table :data_table_states do |t|
      t.string :table, null: false
      t.jsonb :state

      t.timestamps
    end
  end
end
