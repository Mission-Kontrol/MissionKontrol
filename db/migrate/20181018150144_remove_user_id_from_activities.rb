class RemoveUserIdFromActivities < ActiveRecord::Migration[5.1]
  def change
    remove_column :activities, :user_id
  end
end
