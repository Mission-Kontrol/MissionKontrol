# frozen_string_literal: true

module TableRender
  extend ActiveSupport::Concern

  private

  # TODO: make the unshift only applicable if user has ability to delete from this table
  def render_show_html(table)
    sql_result = @target_db.all(table, 10, 0)
    @headers = sql_result ? sql_result.columns.unshift('') : []
    ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)

    render :show
  end

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

    data = if sql_result.nil?
             {}
           elsif order_column && order_dir
             sql_result.to_hash
           else
             sql_result.to_hash.sort_by { |k| k['id'] }
           end

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db.count(@table).rows[0][0],
      recordsFiltered: @target_db.count(@table).rows[0][0]
    }
  end

  def render_preview_html
    @activity = Activity.new
    record_id = params[:record_id]
    if record_id.include?("+")
      target_table_setting = TargetTableSetting.where(database_id: @database.id, name: @current_table).first
      primary_keys = target_table_setting.primary_keys['primary_keys']
      @row = @target_db.find_by_primary_keys(@current_table, primary_keys, record_id)
    else
      @row = @target_db.find(@current_table, record_id)
    end
    @layout_builder = ViewBuilder.where(table_name: @current_table, database_id: @database.id).last
    @fields_with_type = list_table_fields_with_type(@layout_builder.table_name) if @layout_builder
    set_activities_for_table
    set_relatable_tables
  end

  def render_preview_js
    offset = params['start']
    limit = params['length']
    columns = []
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
    table = params['table']
    foreign_key_title = helpers.get_foreign_key(params[:table_name])
    foreign_key_value = params[:record_id]

    sql_result = @target_db.find_all_related_search(@database, table, search, foreign_key_title, foreign_key_value, searchable_columns, limit, offset)

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
end
