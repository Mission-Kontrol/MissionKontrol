class AddCommentableToViewBuilders < ActiveRecord::Migration[5.1]
  def change
    add_column :view_builders, :commentable, :boolean, default: false, null: false
  end
end
