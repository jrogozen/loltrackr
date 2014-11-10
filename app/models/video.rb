class Video < ActiveRecord::Base
  acts_as_taggable_on :champions, :players, :teams
  has_many :plays

  def self.add_data_to_videos
    video_array = []
    videos = Video.all.order('created_at desc')
    videos.each do |video|
      video_object = video.attributes
      video_object["plays"] = video.plays
      video_array << video_object
    end
    video_array
  end
end
