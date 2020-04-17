# frozen_string_literal: true

module TableRender
  extend ActiveSupport::Concern

  private

  # TODO: make the unshift only applicable if user has ability to delete from this table
  def render_show_html(table)
    sql_result = @target_db.all(table)
    @headers = sql_result ? sql_result.columns.unshift('') : []
    render :show
  end

  # rubocop:disable Metrics/MethodLength
  def render_show_js
    offset = params['start']
    limit = params['length']
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
    columns = []
    order_column_number = params['order'].try(:[], '0').try(:[], 'column')
    order_column = params['columns'].try(:[], order_column_number).try(:[], 'data')
    order_dir = params['order'].try(:[], '0').try(:[], 'dir')

    sql_result = @target_db.datatable_filter(@database, @table, search, searchable_columns, limit, offset, order_column, order_dir)

    result_columns = sql_result.nil? ? @target_db.table_columns(@table) : sql_result.columns

    result_columns.each do |c|
      columns << { data: c }
    end

    data = sql_result.nil? ? {} : sql_result.to_hash.sort_by { |k| k['id'] }

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count(@table).rows[0][0],
      recordsFiltered: @target_db.count(@table).rows[0][0]
    }
  end
  # rubocop:enable Metrics/MethodLength

  def render_preview_html
    # @target_db.table = @current_table
    @activity = Activity.new
    @row = @target_db.find(@current_table, params[:record_id])
    @layout_builder = ViewBuilder.where(table_name: @current_table, database_id: @database.id).last
    @fields_with_type = list_table_fields_with_type(@layout_builder.table_name) if @layout_builder
    set_activities_for_table
    set_relatable_tables
  end

  ## TODO: these three are duplicate, move into concern
  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(@database_connection, table).call
  end

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(@database_connection, table).call
  end

  def set_relatable_tables
    @relatable_tables = []

    relatable_tables(@current_table).each do |table|
      # layout = ViewBuilder.find_by(table_name: table, database_id: @database.id)
      relative = {}
      # @target_db.table = table
      foreign_key_title = helpers.get_foreign_key(@current_table)
      foreign_key_value = params[:record_id]
      ## TODO: why does target_db keep crapping out at this point?
      # sql_result = @target_db.find_all_related(table, foreign_key_title, foreign_key_value, 10, 0)
      sql_result = nil
      relative[:headers] = sql_result ? sql_result.columns : []
      relative[:name] = table
      @relatable_tables << relative
    end

    @relatable_tables
  end

  # rubocop:disable Metrics/MethodLength
  def render_preview_js
    offset = params['start']
    limit = params['length']
    columns = []
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
    table = params['table']
    foreign_key_title = helpers.get_foreign_key(params[:table_name])
    foreign_key_value = params[:record_id]

    sql_result = @target_db.find_all_related_search(table, search, foreign_key_title, foreign_key_value, searchable_columns, limit, offset)

    result_columns = sql_result.nil? ? @target_db.table_columns(table) : sql_result.columns

    result_columns.each do |c|
      columns << { data: c }
    end

    data = sql_result.nil? ? {} : sql_result.to_hash

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count_related(table, foreign_key_title, foreign_key_value).rows[0][0],
      recordsFiltered: @target_db.count_related(table, foreign_key_title, foreign_key_value).rows[0][0]
    }
  end
  # rubocop:enable Metrics/MethodLength
end
