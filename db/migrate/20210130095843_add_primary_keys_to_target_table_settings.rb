class AddPrimaryKeysToTargetTableSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :target_table_settings, :primary_keys, :jsonb
  end
end
