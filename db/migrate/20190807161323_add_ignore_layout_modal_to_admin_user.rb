class AddIgnoreLayoutModalToAdminUser < ActiveRecord::Migration[5.1]
  def change
    add_column :admin_users, :ignore_layout_modal, :boolean, default: false
  end
end
