class AddCallableFieldsToLayoutBuilder < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :callable_fields, :jsonb, default: []
  end
end
