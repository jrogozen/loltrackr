class TwitchApiController < ApplicationController
  def get_stream
    streamer = params["streamer"]
    twitch_response = HTTParty.get('https://api.twitch.tv/kraken/streams/' + streamer)
    render json: twitch_response
  end

  def get_game_data
    streamer = params["streamer"]

    hash = {
      "tsm_wildturtle" => {
        "wildturtle" => 0,
        "lolcat4" => 0
      },
      "imaqtpie" => {
        "imaqtpie" => 0,
        "sqwaak" => 0
      },
      "phantoml0rd" => {
        "phantoml0rd" => 0
      },
      "mushisgosu" => {
        "clgdeftsu" => 0
      },
      "tsm_dyrus" => {
        "ultrabaymax76000" => 0,
        "dyrus" => 0
      },
      "tsm_bjergsen" => {
        "roadtochallenger" => 0
      },
      "nightblue3" => {
        "xxxshowtimexxx" => 0
      },
      "scarra" => {
        "scarra" => 0
      }
    }

    game = {}

    hash[streamer].each do |x, y|

      spectator_response = HTTParty.get("https://spectator-league-of-legends-v1.p.mashape.com/lol/na/v1/spectator/by-name/" + x, 
        headers:{
          "X-Mashape-Key" => "Qyu8IAMfP1mshl5K8h80pVoC1U3wp1Ua7aJjsnHQzNVI45Wyx7"
        }
      )

      if !spectator_response["data"]["error"]
        game = spectator_response
        break
      end

    end

    render json: game

  end
end