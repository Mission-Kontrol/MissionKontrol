# frozen_string_literal: true

class UsersController < ApplicationController
  layout 'dashboard'

  def index
    @users = User.all
  end

  def show
    @activities = activities_for_user
    @activity = Activity.new
    @user = User.find(params[:id])
  end

  private

  def activities_for_user
    activities_for_user = Activity.find_all_by_user_id(user_id: params[:id])
    activities = OpenStruct.new
    activities.all = activities_for_user
    activities.calls = activities_for_user.select { |i| i.kind == 'call' }
    activities.notes = activities_for_user.select { |i| i.kind == 'note' }
    activities.meetings = activities_for_user.select { |i| i.kind == 'meeting' }
    activities
  end
end
