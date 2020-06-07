class AddDatabaseIdToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :database_id, :integer
  end
end
