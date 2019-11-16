class CreatePermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :permissions do |t|
      t.integer :admin_user_id
      t.string :name
      t.string :subject_class
      t.integer :subject_id
      t.string :action
      t.text :description

      t.timestamps
    end
  end
end
