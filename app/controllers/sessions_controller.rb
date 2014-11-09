class SessionsController < ApplicationController

  def create
    if params[:email]
      user = User.authenticate(params[:email], params[:password])
      log_in_user(user)
      render json: current_user
    end
  end

  def destroy
    log_out_user
    redirect_to "/", notice: "You've been logged out."
  end

end
