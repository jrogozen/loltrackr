class SearchController < ApplicationController
  def show
    query = params["query"].split(" ")

    x = Video.tagged_with(query, :any => true, :wild => true)

    y = Video.where("title ilike ?", "%#{params['query']}%")

    @videos = x.zip(y).flatten.compact

    render json: @videos
  end
end
