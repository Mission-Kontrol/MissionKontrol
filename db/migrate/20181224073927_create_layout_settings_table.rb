class CreateLayoutSettingsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :layout_settings do |t|
      t.integer :layout_id, null: false
      t.string :primary_table
      t.boolean :show_status, default: false, null: false
      t.boolean :commentable, default: false, null: false
      t.string :parent_comments_table
    end
  end
end
