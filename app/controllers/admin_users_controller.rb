class AdminUsersController < ApplicationController
  def index
    @users = User.all
  end
end
