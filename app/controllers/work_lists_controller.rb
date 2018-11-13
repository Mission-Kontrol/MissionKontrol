# frozen_string_literal: true

class WorkListsController < ApplicationController
  layout 'dashboard'
  before_action :set_worklist, only: [:create]

  def index
    @work_lists = [
      OpenStruct.new(name: 'Accounts without demos'),
      OpenStruct.new(name: 'End of trial calls'),
      OpenStruct.new(name: 'Slipping away'),
    ]
  end

  def show
    work_lists = [
      'Accounts without demos',
      'End of trial calls',
      'Slipping away'
    ]

    @work_list = work_lists[params[:id].to_i - 1]
  end

  def new
    filter = SQLFilter::Equal.new
    filter.column = "name"
    @work_list = WorkList.new
    @work_list.add_sql_filter(filter)

    # @column_filters = []
    # @column_filters << SQLFilter::Equal.new
    # @column_filters << SQLFilter::Equal.new

    # create

    # @work_list = WorkList.new
    @db_table_names = ClientRecord.connection.tables
    @array_of_query_conditions = [
      'equal',
      # 'between',
      # 'not equal',
      # 'greater than',
      # 'greater than or equal to',
      # 'less than',
      # 'less than or equal to',
      # 'is empty'
    ]

    @hash_of_tables_and_columns = {}
    ClientRecord.connection.tables.each do |table|
      @hash_of_tables_and_columns[table] = []
      ClientRecord.connection.columns(table).each do |column|
        @hash_of_tables_and_columns[table] << column.name
      end
    end
  end

  def create
    sql_filters = []
    sql_filter = SQLFilter::Equal.new
    sql_filter.id = 1
    sql_filter.kind = "equal"
    sql_filter.operator = nil
    sql_filters << sql_filter

    @worklist.sql_filters = sql_filters.to_json

    if @worklist.save
      redirect_to work_lists_path
    else
      render :new
    end
  end

  def add_sql_filter
    # create filter
    # append to list
    
    # @activity = @feedable.activities.new(activity_params)
    #
    # respond_to do |format|
    #   if @feedable.save
    #     format.js { render action: 'success' }
    #   else
    #     format.js { render action: 'failure', status: :unprocessable_entity }
    #   end
    # end
  end

  private

  def work_list_params
    params.require(:work_list).permit(:name,
                                     :details)
  end

  def set_worklist
    filter = SQLFilter::Equal.new
    filter.column = "name"
    @work_list = WorkList.new(work_list_params)
    @work_list.add_sql_filter(filter)
    @work_list
  end
end
