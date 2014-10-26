class TeamsController < ApplicationController
  def index
  end

  def show

    team_object = {}

    t = Team.find_by(urlhash: params["id"])

    team_object["info"] = t

    # riot api data

    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,tags,stats&api_key=' + @riot_key)

    champions = []

    response["data"].each do |champ, data|

      local_champ = t.champions.find_by(name: champ)

      if local_champ
        response["data"][champ]["role"] = local_champ.role.split(";").map {|x| x.capitalize}
        champions << data
      end

    end

    team_object["champions"] = champions

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
