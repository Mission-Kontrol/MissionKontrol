class AddEditableFieldsToTargetTableSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :target_table_settings, :editable_fields, :jsonb
  end
end
