class Play < ActiveRecord::Base
  acts_as_taggable_on :champions, :players
  belongs_to :video

  def self.build_object(video)
    video_object = {
        plays: [],
        video: ""
      }
      
    video_object[:video] = video

    video.plays.each do |play|
      p = play.attributes
      p["players"] = play.player_list
      video_object[:plays] << p
    end

    video_object
  end

  

end


# def self.x(plays)
#   # look through all plays descriptions

#   # find kills by matching the words "kill, kills, killed"

# end

