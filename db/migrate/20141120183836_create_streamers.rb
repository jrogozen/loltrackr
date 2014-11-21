class CreateStreamers < ActiveRecord::Migration
  def change
    create_table :streamers do |t|
      t.string :twitch_handle
      t.timestamps
    end
  end
end
