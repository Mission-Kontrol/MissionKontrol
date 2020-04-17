class AddRelayGemToDatabases < ActiveRecord::Migration[5.1]
  def change
    add_column :databases, :domain_url, :string
    add_column :databases, :gem_token, :string
  end
end
