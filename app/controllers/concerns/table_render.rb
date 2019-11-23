# frozen_string_literal: true

module TableRender
  extend ActiveSupport::Concern

  private

  def render_show_html
    sql_result = @target_db_repo.all
    @headers = sql_result ? sql_result.columns : []
    render :show
  end

  def render_show_js
    offset = params['start']
    limit = params['length']
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
    columns = []

    sql_result = @target_db_repo.datatable_filter(search, searchable_columns, limit, offset)

    result_columns = sql_result.nil? ? @target_db_repo.table_columns : sql_result.columns

    result_columns.each do |c|
      columns << { data: c }
    end

    data = sql_result.nil? ? {} : sql_result.to_hash

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db_repo.count.rows[0][0],
      recordsFiltered: @target_db_repo.count.rows[0][0]
    }
  end

  def render_preview_html
    @target_db_repo.table = @current_table
    @activity = Activity.new
    @row = @target_db_repo.find(params[:record_id])
    @layout_builder = ViewBuilder.where(table_name: @current_table).last
    @fields_with_type = list_table_fields_with_type(@layout_builder.table_name) if @layout_builder
    set_activities_for_table
  end

  # rubocop:disable Metrics/MethodLength
  def render_preview_js
    offset = params['start']
    limit = params['length']
    columns = []
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
    @target_db_repo.table = params['table']
    foreign_key_title = helpers.get_foreign_key(params[:table_name])
    foreign_key_value = params[:record_id]

    sql_result = @target_db_repo.find_all_related_search(search, foreign_key_title, foreign_key_value, searchable_columns, limit, offset)

    result_columns = sql_result.nil? ? @target_db_repo.table_columns : sql_result.columns

    result_columns.each do |c|
      columns << { data: c }
    end

    data = sql_result.nil? ? {} : sql_result.to_hash

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db_repo.count_related(foreign_key_title, foreign_key_value).rows[0][0],
      recordsFiltered: @target_db_repo.count_related(foreign_key_title, foreign_key_value).rows[0][0]
    }
  end
  # rubocop:enable Metrics/MethodLength
end
