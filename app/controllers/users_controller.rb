class UsersController < ApplicationController
  def show
    if current_user
      render json: current_user
    else
      render json: {}
    end
  end
end
