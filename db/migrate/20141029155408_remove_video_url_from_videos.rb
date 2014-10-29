class RemoveVideoUrlFromVideos < ActiveRecord::Migration
  def change
    remove_column :videos, :video_url
    remove_column :videos, :description
    add_column :videos, :youtube_id, :string
  end
end
