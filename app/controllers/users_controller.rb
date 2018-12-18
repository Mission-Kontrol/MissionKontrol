# frozen_string_literal: true

class UsersController < ApplicationController
  layout 'dashboard'

  def index
    @users = User.all
    @companies = Company.all
  end

  def show
    @user = User.find(params[:id])
    @activity = Activity.new
    @activities = OpenStruct.new
    @view_builders = find_view_builders
    set_activities_for_user
  end

  private

  def set_activities_for_user
    feedable_type = 'users'
    feedable_id = params[:id]

    @activities_for_user = Activity.where(
      feedable_type: feedable_type,
      feedable_id: feedable_id
    )

    group_activities_by_kind
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

  def table_fields
    Kuwinda::Presenter::ListTableFields.new(ClientRecord, 'Users').call
  end

  def permitted_params
    params.require(:user).permit(:id)
  end

  def find_view_builders
    ViewBuilder.where(status: 'active', table_name: 'Events')
  end
end
