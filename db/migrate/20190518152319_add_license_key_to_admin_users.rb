class AddLicenseKeyToAdminUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :admin_users, :license_key, :string
    add_column :admin_users, :activation_id, :string
  end
end
