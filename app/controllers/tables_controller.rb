# frozen_string_literal: true

class TablesController < ApplicationController
  layout 'dashboard'

  before_action :authenticate_admin_user!,
                :set_target_db_repo,
                :set_activities,
                :set_current_table,
                :load_available_tables,
                :check_license

  before_action :load_task_queues, only: %i[show preview]
  before_action :set_relatable_tables, only: %i[preview]
  before_action :set_layout_for_table, only: %i[show]

  def show
    respond_to do |format|
      format.html do
        render_show_html
      end

      format.js do
        render_show_js
      end
    end
  end

  def preview
    respond_to do |format|
      format.html do
        render_preview_html
      end

      format.js do
        render_preview_js
      end
    end
  end

  def update_table_field
    @target_db_repo.update_record(table_field_params[:table],
                                  table_field_params[:field],
                                  table_field_params[:value],
                                  table_field_params[:id])
  rescue ActiveRecord::StatementInvalid => e
    render json: {
     error: e.to_s
   }, status: 400
  end

  def update_related_table_field
    @target_db_repo.update_related_record(related_table_field_params[:table],
                                  related_table_field_params[:field],
                                  related_table_field_params[:value],
                                  related_table_field_params[:foreign_key_title],
                                  related_table_field_params[:foreign_key_value])
  rescue ActiveRecord::StatementInvalid => e
    render json: {
     error: e.to_s
   }, status: 400
  end

  private

  def render_show_html
    sql_result = @target_db_repo.all
    @headers = sql_result ? sql_result.columns : []
    render :show
  end

  def render_show_js
    offset = params['start']
    limit = params['length']
    columns = []

    sql_result = @target_db_repo.all(limit, offset)

    sql_result.columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: sql_result.to_hash,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db_repo.count.rows[0][0],
      recordsFiltered: @target_db_repo.count.rows[0][0]
    }
  end

  def render_preview_html
    redirect_to new_layout_path unless table_has_layout?(@current_table)

    @target_db_repo.table = @current_table
    @activity = Activity.new
    @row = @target_db_repo.find(params[:record_id])
    @layout_builder = ViewBuilder.where(table_name: @current_table).last
    @fields_with_type = list_table_fields_with_type(@layout_builder.table_name) if @layout_builder
    set_activities_for_table
  end

  def render_preview_js
    offset = params['start']
    limit = params['length']
    columns = []
    @target_db_repo.table = params["table"]
    foreign_key_title = helpers.get_foreign_key(params[:table_name])
    foreign_key_value = params[:record_id]
    sql_result = @target_db_repo.find_all_related(foreign_key_title, foreign_key_value, limit, offset)

    sql_result.columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: sql_result.to_hash,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: @target_db_repo.count_related(foreign_key_title, foreign_key_value).rows[0][0],
      recordsFiltered: @target_db_repo.count_related(foreign_key_title, foreign_key_value).rows[0][0]
    }
  end

  def set_target_db_repo
    @target_db_repo = Kuwinda::Repository::TargetDB.new(params[:table])
  end

  def set_activities_for_table
    feedable_type = @target_db_repo.table
    feedable_id = params[:record_id]

    @activities_for_table = Activity.where(
      feedable_type: feedable_type,
      feedable_id: feedable_id
    )

    group_activities_by_kind
  end

  def group_activities_by_kind
    select_all_activities
    select_call_activities
    select_note_activities
    select_meeting_activities
  end

  def select_all_activities
    @activities.all = @activities_for_table
  end

  def select_call_activities
    @activities.calls = @activities_for_table.select do |i|
      i.kind == 'call'
    end
  end

  def select_meeting_activities
    @activities.meetings = @activities_for_table.select do |i|
      i.kind == 'meeting'
    end
  end

  def select_note_activities
    @activities.notes = @activities_for_table.select do |i|
      i.kind == 'note'
    end
  end

  def table_field_params
    params.require(:table_field).permit(:id,
                                     :field,
                                     :table,
                                     :value)
  end

  def related_table_field_params
    params.require(:related_table_field).permit(:foreign_key_value,
                                     :foreign_key_title,
                                     :field,
                                     :table,
                                     :value)
  end

  def table_has_layout?(table)
    ViewBuilder.where(table_name: table).size > 0
  end

  def set_layout_for_table
    @layout_for_table = ViewBuilder.where(table_name: @current_table).first
  end

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def set_current_table
    @current_table = params[:table]
  end
end
