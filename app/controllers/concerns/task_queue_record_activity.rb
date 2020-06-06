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
    select_outcome_activities
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

  def select_outcome_activities
    @activities_for_task_queue_record.select do |i|
      i.kind == 'outcome'
    end
  end

  def create_outcome(outcome_params, item_timeout)
    item_reappear_time = item_timeout ? Time.now + item_timeout.to_i.hours : nil
    TaskQueueOutcome.create!(
      outcome: outcome_params['outcome'],
      task_queue_id: outcome_params['task_queue_id'],
      task_queue_item_table: outcome_params['table'],
      task_queue_item_primary_key: outcome_params['primary_key'],
      task_queue_item_reappear_at: item_reappear_time
    )
  end

  def complete_outcome_actions(task_queue, outcome_params)
    outcome_success = outcome_params['outcome'] == 'success'

    if outcome_success && task_queue.success_outcome_enabled?
      @target_db.update_record(
        task_queue.table,
        task_queue.success_database_update['update_field'],
        success_value(task_queue, outcome_params),
        outcome_params['primary_key']
      )
    elsif !outcome_success && task_queue.failure_outcome_enabled?
      @target_db.update_record(
        task_queue.table,
        task_queue.failure_database_update['update_field'],
        failure_value(task_queue, outcome_params),
        outcome_params['primary_key']
      )
    end
  end

  def success_value(task_queue, outcome_params)
    case task_queue.success_database_update['update_type']
    when 'Boolean'
      then task_queue.success_database_update['update_boolean']
    when 'Text'
      then task_queue.success_database_update['update_text']
    when 'Increment'
      then get_value(task_queue, task_queue.success_database_update, outcome_params)
    end
  end

  def failure_value(task_queue, outcome_params)
    case task_queue.failure_database_update['update_type']
    when 'Boolean'
      then task_queue.failure_database_update['update_boolean']
    when 'Text'
      then task_queue.failure_database_update['update_text']
    when 'Increment'
      then get_value(task_queue, task_queue.failure_database_update, outcome_params)
    end
  end

  def get_value(task_queue, update, outcome_params)
    current_value = @target_db.query("select #{update['update_field']} from #{task_queue.table} where id = #{outcome_params['primary_key']};", nil, nil)
    current_value.rows[0][0] += 1
  end
end
