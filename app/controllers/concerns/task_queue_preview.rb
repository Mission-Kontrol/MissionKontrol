# frozen_string_literal: true

module TaskQueuePreview
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
end
