class RenameDatabasePasswordField < ActiveRecord::Migration[5.1]
  def change
    rename_column :databases, :password_digest, :password
  end
end
