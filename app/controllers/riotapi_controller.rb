class RiotapiController < ApplicationController

  def get_champions
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,tags&api_key=' + @riot_key)

    reference = Champion.all

    champions = []

    response["data"].each do |champ, data|
      local_champ = Champion.find_by(name: champ)

      if local_champ
        response["data"][champ]["role"] = local_champ.role
      end

      champions << {champ: data}

    end

    render json: champions
  end

end
