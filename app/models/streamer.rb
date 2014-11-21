class Streamer < ActiveRecord::Base
  has_many :aliases
  has_many :games
end
