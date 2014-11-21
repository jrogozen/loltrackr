class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :streamer
      t.integer :team_one, :default => 1
      t.integer :team_two, :default => 1
      t.timestamps
    end
  end
end
