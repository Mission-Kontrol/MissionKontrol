# frozen_string_literal: true

class TaskQueuesController < ApplicationController
  layout 'task_queue'
  before_action :load_available_tables

  def index
    @task_queue = TaskQueue.new
    @work_lists = WorkList.order(created_at: :desc)
  end

  # def show
  #   @work_list = WorkList.find(params[:id])
  #   @work_list_data = ClientRecord.connection.exec_query(@work_list.sql_to_run)
  #
  #   @activities = OpenStruct.new
  #   @activities.all = []
  #   @activities.calls = []
  #   @activities.meetings = []
  #   @activities.notes = []
  # end

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
    @task_queue = TaskQueue.find(params[:id])
    @task_queue.query_builder_rules = params["task_queue"]["query_builder_rules"]
    @task_queue.raw_sql = params["task_queue"]["raw_sql"]

    if @task_queue.save
      begin
        data = data_for_preview(@task_queue)
        render action: 'update/success', json: {
          rows: data[:rows],
          columns: data[:columns]
        }
      rescue Exception => e
        render action: 'update/error', status: 422, json: {}
      end
    end
  end

  def updatee
    @task_queue = TaskQueue.find(params[:id])
    @task_queue.query_builder_rules = params["task_queue"]["query_builder_rules"]
    @task_queue.raw_sql = params["task_queue"]["raw_sql"]

    if @task_queue.save
      data = data_for_preview(@task_queue)
      render action: 'update/success', json: {
        rows: data[:rows],
        columns: data[:columns]
      }
    else
      render action: 'update/error', status: 422
    end
  end

  private

  def task_queue_params
    params.require(:task_queue).permit(:name,
                                        :details,
                                        :table)
  end

  def handle_success(action:, js_func:, notice:)
    flash[:notice] = notice
    render(action: action, js: js_func)
  end

  def data_for_preview(task_queue)
    repo = Kuwinda::Repository::TargetDB.new(table: task_queue.table)
    data = {}
    rows = []
    columns = []

    if !task_queue.raw_sql.blank?
      query = repo.query(task_queue.raw_sql, 5)
    elsif !task_queue.to_sql.blank?
      query = repo.query(task_queue.to_sql, 5)
    else
      return data
    end

    query.to_hash.each do |row|
      rows << {options: {expanded: true}, value: row}
    end

    query.columns.each do |col|
      columns << {'name': col, 'title': col}
    end

    data[:rows] = rows
    data[:columns] = columns
    data
  end
end
