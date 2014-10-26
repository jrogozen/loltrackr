class Team < ActiveRecord::Base
  has_many :champion_teams
  has_many :champions, through: :champion_teams
end
