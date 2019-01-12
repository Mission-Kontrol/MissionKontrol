# frozen_string_literal: true

class TablesController < ApplicationController
  layout 'dashboard'
  before_action :authenticate_admin_user!,
                :set_target_db_repo,
                :set_activities

  def show; end

  def preview
    @target_db_repo.table = params[:table_name]
    @activity = Activity.new
    @row = @target_db_repo.find(params[:record_id])
    set_activities_for_table
  end

  private

  def set_target_db_repo
    @target_db_repo = Kuwinda::Repository::TargetDB.new(params[:id])
  end

  def set_activities
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
  end

  def set_activities_for_table
    feedable_type = @target_db_repo.table
    feedable_id = params[:record_id]

    @activities_for_table = Activity.where(
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
    @activities.all = @activities_for_table
  end

  def select_call_activities
    @activities.calls = @activities_for_table.select do |i|
      i.kind == 'call'
    end
  end

  def select_meeting_activities
    @activities.meetings = @activities_for_table.select do |i|
      i.kind == 'meeting'
    end
  end

  def select_note_activities
    @activities.notes = @activities_for_table.select do |i|
      i.kind == 'note'
    end
  end
end
