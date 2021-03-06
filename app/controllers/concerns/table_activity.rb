# frozen_string_literal: true

module TableActivity
  extend ActiveSupport::Concern

  private

  def set_activities
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
    @activities.outcomes = []
  end

  def set_activities_for_table
    feedable_type = params[:table]
    feedable_id = params[:record_id]

    @activities_for_table = Activity.where(
      feedable_type: feedable_type,
      feedable_id: feedable_id,
      database_id: @database.id
    ).last(3).sort_by(&:created_at).reverse

    group_activities_by_kind
  end

  def group_activities_by_kind
    select_all_activities
    select_call_activities
    select_note_activities
    select_meeting_activities
    select_outcome_activities
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

  def select_outcome_activities
    @activities.outcomes = @activities_for_table.select do |i|
      i.kind == 'outcome'
    end
  end
end
