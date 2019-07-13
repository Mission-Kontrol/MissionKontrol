# frozen_string_literal: true

module TaskQueueRecordActivity
  extend ActiveSupport::Concern

  private

  def set_activities_for_task_queue_record
    @activity = Activity.new
    feedable_type = @repo.table
    feedable_id = @row

    @activities_for_task_queue_record = Activity.where(
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
    @activities.all = @activities_for_task_queue_record
  end

  def select_call_activities
    @activities.calls = @activities_for_task_queue_record.select do |i|
      i.kind == 'call'
    end
  end

  def select_meeting_activities
    @activities.meetings = @activities_for_task_queue_record.select do |i|
      i.kind == 'meeting'
    end
  end

  def select_note_activities
    @activities.notes = @activities_for_task_queue_record.select do |i|
      i.kind == 'note'
    end
  end
end
