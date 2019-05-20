# frozen_string_literal: true

class TaskQueuesController < ApplicationController
  layout 'task_queue'
  before_action :load_available_tables

  def index
    @task_queue = TaskQueue.new
    @work_lists = WorkList.order(created_at: :desc)
  end

  def edit
    @task_queue = TaskQueue.find(params[:id])
  end

  def new; end

  def create
    @task_queue = TaskQueue.new(task_queue_params)

    if @task_queue.save
      render status: 201, json: @task_queue
    else
      render 'create/error', status: 422, json: @task_queue.errors.full_messages
    end
  end

  def update
    load_task_queue
    @task_queue.save!
    data = data_for_preview(@task_queue)
    render action: 'update/success', json: data
  rescue StandardError
    render action: 'update/error', status: 422, json: {}
  end

  private

  def load_task_queue
    @task_queue = TaskQueue.find(params[:id])
    @task_queue.query_builder_rules = params['task_queue']['query_builder_rules'] if params['task_queue']['query_builder_rules']
    @task_queue.query_builder_sql = params['task_queue']['query_builder_sql'] if params['task_queue']['query_builder_sql']
    @task_queue.raw_sql = params['task_queue']['raw_sql'] if params['task_queue']['raw_sql']
    @task_queue.draggable_fields = params['task_queue']['draggable_fields'] if params['task_queue']['draggable_fields']
  end

  def task_queue_params
    params.require(:task_queue).permit(:name,
                                       :details,
                                       :table)
  end

  def handle_success(action:, js_func:, notice:)
    flash[:notice] = notice
    render(action: action, js: js_func)
  end

  def build_row_data_for_preview(query)
    rows = []

    query.to_hash.each do |row|
      rows << { options: { expanded: true }, value: row }
    end

    rows
  end

  def build_column_data_for_preview(query)
    columns = []

    query.columns.each do |col|
      columns << { 'name': col, 'title': col }
    end

    columns
  end

  def build_response_for_preview(query)
    return {} if query.empty?

    data = {}
    columns = build_column_data_for_preview(query)
    rows = build_row_data_for_preview(query)
    data[:rows] = rows
    data[:columns] = columns
    data
  end

  def build_query_for_preview(task_queue)
    repo = Kuwinda::Repository::TargetDB.new(table: task_queue.table)

    if !task_queue.raw_sql.blank?
      repo.query(task_queue.raw_sql, 5)
    elsif !task_queue.to_sql.blank?
      repo.query(task_queue.to_sql, 5)
    else
      {}
    end
  end

  def data_for_preview(task_queue)
    query = build_query_for_preview(task_queue)
    build_response_for_preview(query)
  end
end
