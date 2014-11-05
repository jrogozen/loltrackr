class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.string :description
      t.integer :minute
      t.integer :second
      t.belongs_to :video
      t.timestamps
    end
  end
end
