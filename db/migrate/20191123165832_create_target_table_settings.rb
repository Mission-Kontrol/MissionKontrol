class CreateTargetTableSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :target_table_settings do |t|
      t.string :name, null: false
      t.string :nested_table
      t.string :create_destination
      t.string :delete_destination
    end
  end
end
