class PlaysController < ApplicationController
  def index
    video = Video.find(params["video_id"])

    video_object = Play.build_object(video)
  
    render json: video_object
  end

  def create
    @video = Video.find(params["video_id"])
    play_object = {}

    p = Play.create(play_params)
    p.player_list.add(params["play"]["players"], parse: true)
    p.save

    @video.plays << p

    render json: @video
  end

  private

  def play_params
    params.require(:play).permit(:minute, :second, :description, :players)
  end
end
