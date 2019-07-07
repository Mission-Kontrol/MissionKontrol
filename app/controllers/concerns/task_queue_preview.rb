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
    @target_db_repo = Kuwinda::Repository::TargetDB.new(task_queue.table)

    if !task_queue.raw_sql.blank?
      @target_db_repo.query(task_queue.raw_sql, limit, offset)
    elsif !task_queue.to_sql.blank?
      @target_db_repo.query(task_queue.to_sql, limit, offset)
    else
      {}
    end
  end

  def data_for_preview(task_queue)
    query = build_query_for_preview(task_queue, 10, 0)
    build_response_for_preview(query)
  end
end
