class Video < ActiveRecord::Base
  mount_uploader :video_url, VideoUploader
end
