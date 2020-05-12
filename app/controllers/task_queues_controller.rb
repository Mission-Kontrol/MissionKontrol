# frozen_string_literal: true

class TaskQueuesController < ApplicationController
  include TaskQueuePreview
  include TaskQueueRecordActivity
  include TableActivity
  include DatabasePresenterActions

  layout 'task_queue'
  before_action :set_database, only: %i[new create]
  before_action :set_activities, only: :edit

  def index
    @databases = Database.all
    @task_queues = TaskQueue.all
    render layout: 'standard'
  end

  def new
    database_connection
    @task_queue = TaskQueue.new
    @available_tables = available_tables
    @work_lists = WorkList.order(created_at: :desc)
  end

  def edit
    @task_queue = TaskQueue.find(params[:id])
    @database = Database.find(@task_queue.database_id)
    @database_connection = database_connection
    @target_db = target_db
    result = @task_queue.to_sql.blank? ? @target_db.all(@task_queue.table, 10, 0) : @target_db.query(@task_queue.to_sql, 10, 0)
    @task_queue_headers = result.columns
  end

  def create
    @task_queue = TaskQueue.new(task_queue_params)

    if @task_queue.save
      redirect_to edit_task_queue_path(@task_queue)
    else
      render 'create/error', status: 422, json: @task_queue.errors.full_messages
    end
  end

  def update
    load_task_queue
    @task_queue.save!
    @database = Database.find(@task_queue.database_id)
    @database_connection = database_connection
    data = data_for_preview(@task_queue)
    render action: 'update/success', json: data
  rescue StandardError
    render action: 'update/error', status: 422, json: {}
  end

  def preview
    @task_queue = TaskQueue.find(params[:id])
    @database = Database.find(@task_queue.database_id)
    @database_connection = database_connection
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

  # TODO: this is duplicate of preview
  def show
    @task_queue = TaskQueue.find(params[:id])
    @database = Database.find(@task_queue.database_id)
    @database_connection = database_connection
    @target_db = target_db
    respond_to do |format|
      format.html do
        sql_result = @target_db.all(@task_queue.table)
        @headers = sql_result ? sql_result.columns : []
        render layout: 'standard'
      end

      format.js do
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
    end
  end

  def outcome
    task_queue = TaskQueue.find(params['task_queue_id'])

    task_queue_item_timeout = if params['outcome'] == 'success'
                                task_queue.success_outcome_timeout
                              else
                                task_queue.failure_outcome_timeout
                              end

    outcome = TaskQueueOutcome.new
    outcome.outcome = params['outcome']
    outcome.task_queue_id = params['task_queue_id']
    outcome.task_queue_item_table = params['table']
    outcome.task_queue_item_primary_key = params['primary_key']
    outcome.task_queue_item_reappear_at = Time.now + task_queue_item_timeout.to_i.days
    outcome.save!
  end

  def record
    @task_queue = TaskQueue.find(params[:id])
    @repo = Kuwinda::Repository::TargetDB.new(@task_queue.table)
    @row = params['task_queue_item_primary_key'].to_i
    set_activities_for_task_queue_record
    data = build_data_for_record
    render json: { row: data, activities: @activities_for_task_queue_record, author: current_admin_user.full_name }
  end

  def field_settings
    task_queue = TaskQueue.find(params[:id])
    render json: { fields: helpers.task_queue_draggable_field_settings_container(task_queue).values }
  end

  private

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

  def task_queue_params
    params.require(:task_queue).permit(:name,
                                       :details,
                                       :table,
                                       :database_id)
  end

  def handle_success(action:, js_func:, notice:)
    flash[:notice] = notice
    render(action: action, js: js_func)
  end

  def time_to_reappear?(row)
    outcome = TaskQueueOutcome.where(task_queue_id: @task_queue.id, task_queue_item_primary_key: row['id']).first

    return true unless outcome

    if outcome.task_queue_item_reappear_at < Time.now
      outcome.delete
      true
    else
      false
    end
  end

  def field_visible?(task_queue, field)
    return task_queue.draggable_fields unless task_queue.draggable_fields.present?

    task_queue.draggable_fields.values.map { |f| f['title'] }.include?(field)
  end

  def build_data_for_record
    repo = Kuwinda::Repository::TargetDB.new
    repo.table = @task_queue.table
    row = repo.find(params['task_queue_item_primary_key'])
    record = {}
    row.each do |k, v|
      next unless field_visible?(@task_queue, k)

      record[k] = v
    end

    record
  end

  def set_database
    @database = Database.find(params[:database_id] || task_queue_params[:database_id])
  end
end
