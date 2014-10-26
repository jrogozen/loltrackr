class TeamsController < ApplicationController
  def index
  end

  def show
    team_object = {}
    t = Team.find_by(urlhash: params["id"])

    team_object["info"] = t
    team_object["champions"] = t.champions
    binding.pry
    render json: team_object
  end

  def create
    t = Team.create(ap: params["stats"]["ap"], ad: params["stats"]["ad"], attack: params["stats"]["attack"], defense: params["stats"]["defense"])

    # generate random string for url
    t.urlhash = (0...12).map { (65 + rand(26)).chr.downcase }.join
    
    params["team"].each do |champ|
      c = Champion.find_by(name: champ["name"])
      t.champions << c
    end

    t.save

    render json: t
  end
end
