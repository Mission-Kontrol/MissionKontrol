class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false
      t.string :kind, null: false
      t.text :content
      t.timestamps null: false
    end
  end
end
