# frozen_string_literal: true

module TaskQueueRender
  extend ActiveSupport::Concern

  private

  # TODO: refactor and tidy this up
  def task_queue_to_sql
    return '' if @task_queue.query_builder_sql.blank?

    sql_query = @task_queue.query_builder_sql
    primary_table = @task_queue.table
    if relatable_tables(primary_table)
      join_tables = relatable_tables(primary_table).map { |table| table if sql_query.include? " #{table}" }.compact
      join_conditions = []
      join_tables.each do |join_table|
        join_conditions << "join #{join_table} on #{primary_table}.id = #{join_table}.#{primary_table.chomp('s')}_id "
      end
      sql = "select distinct #{primary_table}.* from #{primary_table} " +
            join_conditions.join(' ') +
            "where #{sql_query};"
    else
      sql = "select * from #{primary_table} where #{sql_query};"
    end
    sql
  end

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
    elsif !task_queue_to_sql.blank?
      @target_db.query(task_queue_to_sql, limit, offset)
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

    outcome_records = @task_queue.task_queue_outcomes.map(&:task_queue_item_primary_key)
    display_data = sql_result.to_hash.reject { |row| outcome_records.include? row['id'].to_s }

    render json: {
      data: display_data,
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

    outcome_records = @task_queue.task_queue_outcomes.map(&:task_queue_item_primary_key)
    display_data = sql_result.to_hash.reject { |row| outcome_records.include? row['id'].to_s }

    render json: {
      data: display_data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count(@task_queue.table).rows[0][0],
      recordsFiltered: sql_result.count(@task_queue.table)
    }
  end

  def load_task_queue
    @task_queue = TaskQueue.find(params[:id])
    attributes_to_update = task_queue_update_params.reject { |_, v| v.blank? }
    @task_queue.update_attributes(attributes_to_update)
  end
end
