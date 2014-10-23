class ChampionsController < ApplicationController

  def index
    Champion.all
  end

end
