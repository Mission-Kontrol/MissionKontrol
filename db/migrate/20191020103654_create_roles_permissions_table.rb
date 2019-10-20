class CreateRolesPermissionsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :roles_permissions do |t|
      t.references :role
      t.references :permission
    end

    add_index(:roles_permissions, [ :role_id, :permission_id ])
  end
end
