class CreateAliases < ActiveRecord::Migration
  def change
    create_table :aliases do |t|
      t.references :streamer
      t.string :name
      t.timestamps
    end
  end
end
