class RiotapiController < ApplicationController

  def get_champions
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,info,tags,stats&api_key=' + @riot_key)

    champions = RiotApi.integrate_data(response["data"])

    render json: champions
  end

  def get_riot_champions
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,info,tags,stats&api_key=' + @riot_key)
    
    champions = RiotApi.only_champions(response["data"])

    render json: champions
  end

  def get_riot_champions
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,info,tags,stats&api_key=' + @riot_key)
    champions = []

    response["data"].each do |champ, data|
      champions << data
    end

    render json: champions
  end

  def get_role
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,info,tags,stats&api_key=' + @riot_key)

    selected_champions = RiotApi.show_matching_roles(response["data"])

    render json: selected_champions
  end

end
