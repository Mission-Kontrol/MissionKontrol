class AddFullLicenseToAdminUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :admin_users, :full_license, :boolean, default: false
  end
end
