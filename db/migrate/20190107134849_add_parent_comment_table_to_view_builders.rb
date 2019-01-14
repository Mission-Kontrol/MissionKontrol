class AddParentCommentTableToViewBuilders < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :parent_comment_table, :string
  end
end
