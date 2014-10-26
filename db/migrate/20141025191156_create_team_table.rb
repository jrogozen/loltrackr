class CreateTeamTable < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.integer :attack
      t.integer :defense
      t.integer :ad
      t.integer :ap
      t.timestamps
    end

    create_table :champion_teams do |t|
      t.belongs_to :champion
      t.belongs_to :team
      t.timestamps
    end

  end
end
