# frozen_string_literal: true

class UsersController < ApplicationController
  layout 'dashboard'
  before_action :set_activities_for_user, only: :show

  def index
    @users = User.all
    @companies = Company.all
  end

  def show
    @user = User.find(params[:id])
    @activity = @user.activities.new
    @activities = OpenStruct.new
    group_activities_by_kind
  end

  private

  def set_activities_for_user
    @activities_for_user = User.find(params[:id]).activities
  end

  def group_activities_by_kind
    select_all_activities
    select_call_activities
    select_note_activities
    select_meeting_activities
  end

  def select_all_activities
    @activities.all = @activities_for_user
  end

  def select_call_activities
    @activities.calls = @activities_for_user.select do |i|
      i.kind == 'call'
    end
  end

  def select_meeting_activities
    @activities.meetings = @activities_for_user.select do |i|
      i.kind == 'meeting'
    end
  end

  def select_note_activities
    @activities.notes = @activities_for_user.select do |i|
      i.kind == 'note'
    end
  end
end
