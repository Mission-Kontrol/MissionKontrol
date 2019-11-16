class CreateOrganisationSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :organisation_settings do |t|
      t.string :license_key
      t.string :activation_id
      t.boolean :full_license, default: false
      t.string :company_name
    end

    remove_column :admin_users, :company_name, :string
    remove_column :admin_users, :license_key, :string
    remove_column :admin_users, :activation_id, :string
    remove_column :admin_users, :full_license, :boolean, default: false

    remove_column :permissions, :admin_user_id, :integer
  end
end
