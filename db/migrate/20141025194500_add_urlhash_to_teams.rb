class AddUrlhashToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :urlhash, :string
  end
end
