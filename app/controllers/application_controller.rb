class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :load_vars

  def load_vars
    @riot_key = ENV["riot_key"]
    @youtube_key = ENV["youtube_key"]
  end

end
