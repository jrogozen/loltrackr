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

  def get_role
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image,info,tags,stats&api_key=' + @riot_key)
    selected_champions = RiotApi.show_matching_roles(response["data"])
    render json: selected_champions
  end

  def champion_by_id
    champ_id = params[:id]
    response = HTTParty.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champ_id + '?api_key=' + @riot_key)
    render json: response
  end

  def player_by_id
    player_id = params[:id]
    response = HTTParty.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/' + player_id + '?api_key=' + @riot_key).values[0]
    render json: response
  end

  def player_champion_stats
    champ_id = params[:champ_id]
    player_id = params[:player_id]
    season = params[:season] || 'SEASON4'
    response = HTTParty.get('https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + player_id + '/ranked?season=' + season + '&api_key=' + @riot_key)
    stats = RiotApi.filter_champion(response, champ_id)
    render json: stats
  end
end
