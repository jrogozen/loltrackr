class VideosController < ApplicationController
  before_action :set_video

  def index
    render json: Video.all
  end

  def show
    video_object = {}

    video_object["info"] = @video
    video_object["player_list"] = @video.player_list
    video_object["champion_list"] = @video.champion_list
    video_object["team_list"] = @video.team_list

    render json: video_object
  end

  def create
    @video = Video.new(video_params)

    @video.champion_list.add(video_params[:champion_list], parse: true)
    @video.player_list.add(video_params[:player_list], parse: true)
    @video.team_list.add(video_params[:team_list], parse: true)

    @video.save
    render json: @video
  end


  private

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:id, :title, :youtube_id, :champion_list, :player_list, :team_list)
  end
end
