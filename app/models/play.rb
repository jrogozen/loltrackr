class Play < ActiveRecord::Base
  acts_as_taggable_on :champions, :players
  belongs_to :video
end
