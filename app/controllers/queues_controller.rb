# frozen_string_literal: true

class QueuesController < ApplicationController
  layout 'queue'
  before_action :set_db_tables, only: %i[new create add_sql_filter edit]
  before_action :set_db_columns, only: %i[new create add_sql_filter edit]
  before_action :load_available_tables

  def index
    @work_lists = WorkList.order(created_at: :desc)
  end

  def show
    @work_list = WorkList.find(params[:id])
    @work_list_data = ClientRecord.connection.exec_query(@work_list.sql_to_run)

    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
  end

  def edit
    @work_list = WorkList.find(params[:id])
  end

  def new
    @work_list = WorkList.new
  end

  def create
    respond_to :js
    @work_list = WorkList.new(work_list_params)

    if @work_list.save
      handle_success(action: 'create/success',
                     js_func: "window.location='#{work_lists_path}'",
                     notice: 'Work list was successfully created.')
    else
      render action: 'create/error'
    end
  end

  def update
    respond_to :js
    @work_list = WorkList.find(params[:id])

    if @work_list.update(work_list_params)
      handle_success(action: 'update/success',
                     js_func: "window.location='#{work_lists_path}'",
                     notice: 'Work list was successfully updated.')
    else
      render action: 'update/error'
    end
  end

  def add_sql_filter
    respond_to :js
    operator = params[:sql_filter][:operator]
    @sql_filter = SQLFilter::Equal.new(operator: operator)
    render action: 'add_sql_filter/success'
  end

  def add_work_list_outcome
    respond_to :js
    @outcome = build_work_list_outcome
    render action: 'add_work_list_outcome/success'
  end

  def remove_sql_filter
    respond_to :js
    render action: 'remove_sql_filter/success'
  end

  def remove_work_list_outcome
    respond_to :js
    render action: 'remove_work_list_outcome/success'
  end

  private

  def work_list_params
    params.require(:work_list).permit(:name,
                                      :details,
                                      :data_table_name,
                                      :sql_query,
                                      visible_columns: [],
                                      sql_filters: sql_filter_params,
                                      outcomes: outcome_params)
  end

  def sql_filter_params
    [sql_filter: %i[operator
                    kind
                    column
                    value]]
  end

  def outcome_params
    [outcome: %i[title
                 detail]]
  end

  def build_work_list_outcome
    WorkListOutcome.new
  end

  def set_worklist
    @work_list = WorkList.new(work_list_params)
  end

  def set_db_tables
    @set_db_tables ||= ClientRecord.connection.tables
  end

  def set_db_columns
    @hash_of_tables_and_columns = {}
    ClientRecord.connection.tables.each do |table|
      @hash_of_tables_and_columns[table] = []
      ClientRecord.connection.columns(table).each do |column|
        @hash_of_tables_and_columns[table] << column.name
      end
    end
  end

  def handle_success(action:, js_func:, notice:)
    flash[:notice] = notice
    render(action: action, js: js_func)
  end
end
