class TwitchApiController < ApplicationController

  def index
    twitch_response = HTTParty.get('https://api.twitch.tv/kraken/streams?game=league+of+legends') 
    render json: twitch_response["streams"]
  end

  def get_stream
    streamer = params["streamer"]
    twitch_response = HTTParty.get('https://api.twitch.tv/kraken/streams/' + streamer)
    render json: twitch_response
  end

  def get_game_data
    streamer = params["streamer"].downcase

    stream = Streamer.find_by(twitch_handle: streamer)

    game = {}

    stream.aliases.each do |x, y|

      spectator_response = HTTParty.get("https://spectator-league-of-legends-v1.p.mashape.com/lol/na/v1/spectator/by-name/" + x.name, 
        headers:{
          "X-Mashape-Key" => "Qyu8IAMfP1mshl5K8h80pVoC1U3wp1Ua7aJjsnHQzNVI45Wyx7"
        }
      )

      if !spectator_response["data"]["error"]
        game = spectator_response

        if spectator_response["data"]["game"]["gameState"] != "IN_PROGRESS" || stream.games.length == 0
          stream.games << Game.create
        end

        break
      end

    end

    render json: game

  end
end