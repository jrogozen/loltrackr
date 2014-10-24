class RiotapiController < ApplicationController

  def get_champions
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,tags&api_key=' + @riot_key)

    champions = []

    response["data"].each do |champ, data|
      local_champ = Champion.find_by(name: champ)

      if local_champ
        response["data"][champ]["role"] = local_champ.role.split(";").map {|x| x.capitalize}
      end

      champions << data

    end

    render json: champions
  end

  def get_role
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,tags&api_key=' + @riot_key)

    selected_champions = []

    response["data"].each do |champ, data|

      local_champ = Champion.where('role LIKE?', '%' + params["q"] + '%').find_by(name: champ)

      if local_champ
        response["data"][champ]["role"] = local_champ.role.split(";")
        selected_champions << data
      end

    end

    render json: selected_champions

  end

end
