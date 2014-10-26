class Champion < ActiveRecord::Base
  has_many :champion_teams
  has_many :teams, through: :champion_teams
end
