class AddOutcomesToWorkLists < ActiveRecord::Migration[5.1]
  def change
    add_column :work_lists, :outcomes, :jsonb, default: []
  end
end
