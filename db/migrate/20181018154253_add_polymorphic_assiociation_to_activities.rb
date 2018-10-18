class AddPolymorphicAssiociationToActivities < ActiveRecord::Migration[5.1]
  def self.up
    add_column :activities, :feedable_type, :string
    add_column :activities, :feedable_id, :integer
    add_index :activities, [:feedable_type, :feedable_id]
    change_column_null :activities, :feedable_type, false
    change_column_null :activities, :feedable_id, false
  end

  def self.down
    remove_column :activities, :feedable_type, :string
    remove_column :activities, :feedable_id, :integer
    remove_index :activities, [:feedable_type, :feedable_id]
  end
end
