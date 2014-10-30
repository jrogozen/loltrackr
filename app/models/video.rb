class Video < ActiveRecord::Base
  acts_as_taggable_on :champions, :players, :teams
end
