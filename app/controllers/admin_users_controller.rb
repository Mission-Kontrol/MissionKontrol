# frozen_string_literal: true

class AdminUsersController < ApplicationController
  def index
    @users = User.all
  end
end
