class DropLayoutSettings < ActiveRecord::Migration[5.1]
  def change
    drop_table :layout_settings
  end
end
