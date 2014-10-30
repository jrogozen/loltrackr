class VideosController < ApplicationController
  def index
  end

  def show
  end

  def create
    binding.pry
    parsed = video_params
    @video = Video.new(parsed)
    @video.champion_list.add(parsed[:champion_list], parse: true)
    @video.player_list.add(parsed[:player_list], parse: true)
    @video.team_list.add(parsed[:team_list], parse: true)
  end

  private
  def video_params
    params.require(:video).permit(:title, :youtube_id, :champion_list, :player_list, :team_list)
  end
end
