# frozen_string_literal: true

class WorkListsController < ApplicationController
  layout 'dashboard'
  before_action :set_db_tables, only: %i[new create add_sql_filter edit]
  before_action :set_db_columns, only: %i[new create add_sql_filter edit]
  before_action :set_query_conditions, only: %i[new create add_sql_filter edit]

  def index
    @work_lists = WorkList.all
  end

  def show
    work_lists = [
      'Accounts without demos',
      'End of trial calls',
      'Slipping away'
    ]

    @work_list = work_lists[params[:id].to_i - 1]
  end

  def edit
    @work_list = WorkList.find(params[:id])
  end

  def new
    @work_list = WorkList.new
  end

  def create
    @work_list = WorkList.new(work_list_params)

    respond_to do |format|
      if @work_list.save
        flash[:notice] = 'Work list was successfully created.'
        format.js do
          render(
            action: 'create/success',
            js: "window.location='#{work_lists_path}'"
          )
        end
      else
        format.js { render action: 'create/error' }
      end
    end
  end

  def update
    @work_list = WorkList.find(params[:id])

    respond_to do |format|
      if @work_list.update(work_list_params)
        flash[:notice] = 'Work list was successfully updated.'
        format.js do
          render(
            action: 'update/success',
            js: "window.location='#{work_lists_path}'"
          )
        end
      else
        format.js { render action: 'update/error' }
      end
    end
  end

  def add_sql_filter
    operator = params[:sql_filter][:operator]
    @sql_filter = SQLFilter::Equal.new(operator: operator)

    respond_to do |format|
      format.js { render action: 'add_sql_filter/success' }
    end
  end

  def add_work_list_outcome
    @outcome = build_work_list_outcome

    respond_to do |format|
      format.js { render action: 'add_work_list_outcome/success' }
    end
  end

  def remove_sql_filter
    respond_to do |format|
      format.js { render action: 'remove_sql_filter/success' }
    end
  end

  def remove_work_list_outcome
    respond_to do |format|
      format.js { render action: 'remove_work_list_outcome/success' }
    end
  end

  private

  def work_list_params
    params.require(:work_list).permit(:name,
                                      :details,
                                      :data_table_name,
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
    WorkListOutcome.new(
      'title' => '',
      'detail' => ''
    )
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

  def set_query_conditions
    @array_of_query_conditions = WorkList::QUERY_CONDITIONS
  end
end
