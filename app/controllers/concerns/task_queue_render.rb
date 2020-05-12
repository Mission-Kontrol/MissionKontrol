# frozen_string_literal: true

module TaskQueueRender
  extend ActiveSupport::Concern

  private

  def build_column_data_for_preview(query)
    columns = []

    query.columns.each do |c|
      columns << { data: c }
    end

    columns
  end

  def build_response_for_preview(query)
    data = {}
    columns = build_column_data_for_preview(query)
    data[:columns] = columns
    data
  end

  def build_query_for_preview(task_queue, limit, offset)
    @target_db = target_db

    if !task_queue.raw_sql.blank?
      @target_db.query(task_queue.raw_sql, limit, offset)
    elsif !task_queue.to_sql.blank?
      @target_db.query(task_queue.to_sql, limit, offset)
    else
      {}
    end
  end

  def data_for_preview(task_queue, limit = 10, offset = 0)
    query = build_query_for_preview(task_queue, limit, offset)
    build_response_for_preview(query)
  end

  def render_preview_js
    offset = params['start']
    limit = params['length']
    columns = []
    sql_result = build_query_for_preview(@task_queue, limit, offset)
    sql_result.columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: sql_result.to_hash,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count(@task_queue.table).rows[0][0],
      recordsFiltered: sql_result.count(@task_queue.table)
    }
  end

  def render_show_js
    offset = params['start']
    limit = params['length']
    columns = []
    sql_result = build_query_for_preview(@task_queue, limit, offset)
    sql_result.columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: sql_result.to_hash,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count(@task_queue.table).rows[0][0],
      recordsFiltered: sql_result.count(@task_queue.table)
    }
  end

  # TODO: fix this
  # rubocop:disable Metrics/AbcSize
  def load_task_queue
    @task_queue = TaskQueue.find(params[:id])
    @task_queue.name = params['task_queue']['name'] if params['task_queue']['name']
    @task_queue.details = params['task_queue']['details'] if params['task_queue']['details']
    @task_queue.query_builder_rules = params['task_queue']['query_builder_rules'] if params['task_queue']['query_builder_rules']
    @task_queue.query_builder_sql = params['task_queue']['query_builder_sql'] if params['task_queue']['query_builder_sql']
    @task_queue.raw_sql = params['task_queue']['raw_sql'] if params['task_queue']['raw_sql']
    @task_queue.draggable_fields = params['task_queue']['draggable_fields'] if params['task_queue']['draggable_fields']
    @task_queue.success_outcome_title = params['task_queue']['success_outcome_title'] if params['task_queue']['success_outcome_title']
    @task_queue.success_outcome_timeout = params['task_queue']['success_outcome_timeout'] if params['task_queue']['success_outcome_timeout']
    @task_queue.failure_outcome_title = params['task_queue']['failure_outcome_title'] if params['task_queue']['failure_outcome_title']
    @task_queue.failure_outcome_timeout = params['task_queue']['failure_outcome_timeout'] if params['task_queue']['failure_outcome_timeout']
  end
  # rubocop:enable Metrics/AbcSize
end
