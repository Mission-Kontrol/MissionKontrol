class AddStatusToAdminUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :admin_users, :status, :string
  end
end
