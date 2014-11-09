class RemovePasswordHashFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :hashed_password
    add_column :users, :password_hash, :string
  end
end
