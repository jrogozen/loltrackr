class GamesController < ApplicationController

  def latest
    # get a specific streamer's latest game
    streamer = params["streamer"].downcase
    game = Streamer.find_by(twitch_handle: streamer).games.last
    render json: game
  end

  def add
    streamer = params["streamer"].downcase
    team = params["team"]
    game = Streamer.find_by(twitch_handle: streamer).games.last
    game[team] += 1
    game.save
    render json: game
  end

end
