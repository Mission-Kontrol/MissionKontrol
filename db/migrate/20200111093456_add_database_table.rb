class AddDatabaseTable < ActiveRecord::Migration[5.1]
  def change
    create_table :databases do |t|
      t.string :adapter, null: false
      t.string :encoding
      t.integer :pool, default: 5
      t.string :host, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.integer :port, null: false
      t.string :name
      t.string :friendly_name
    end
  end
end
