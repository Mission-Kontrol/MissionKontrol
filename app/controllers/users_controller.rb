# frozen_string_literal: true

class UsersController < ApplicationController
  layout 'dashboard'

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end
