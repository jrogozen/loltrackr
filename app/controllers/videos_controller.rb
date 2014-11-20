class VideosController < ApplicationController

  def index
    vids = Video.add_data_to_videos
    render json: vids
  end

  def show
    @video = Video.find(params[:id])

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

  def destroy
    if is_logged_in?
      Video.find(params["id"]).destroy
      render json: { head: 'ok' }
    end
  end

  def find_related
    @video = Video.find(params[:id])

    if params["filter"] == "champion"
      # find_related_champions
      render json: @video.find_related_champions.limit(8)
    elsif params["filter"] == "player"
      # find_related_players
      render json: @video.find_related_players.limit(8)
    elsif params["filter"] == "team"
      # find_related_teams
      render json: @video.find_related_teams.limit(8)
    else
      render json: [{}]
    end
  end

  def latest
    @videos = Video.last(5).reverse
    render json: @videos
  end

  private

  def video_params
    params.require(:video).permit(:id, :title, :youtube_id, :champion_list, :player_list, :team_list)
  end
end
