# frozen_string_literal: true

class TablesController < ApplicationController
  layout 'dashboard'
  before_action :authenticate_admin_user!,
                :setup_demo_target_database,
                :set_target_db_repo,
                :set_activities,
                :set_current_table,
                :load_available_tables

  def show
    sql_result = @target_db_repo.all

    if table_has_layout?(@current_table)
      @layout = ViewBuilder.find_by_table_name(@current_table)
      @headers = sql_result ? sql_result.columns : []
      @hidden_columns = @layout.hidden_columns
    else
      @headers = sql_result ? sql_result.columns.first(5) : []
      @hidden_columns = []
    end

    @rows = sql_result ? sql_result.to_hash : []

  rescue ActiveRecord::StatementInvalid
    @available_tables = []
    render 'bad_connection'
  end

  def preview
    redirect_to new_layout_path unless table_has_layout?(@current_table)

    @target_db_repo.table = @current_table
    @activity = Activity.new
    @row = @target_db_repo.find(params[:record_id])
    @layout_builder = ViewBuilder.where(table_name: @current_table).last
    set_activities_for_table
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

  def hide_column
    view_builder = ViewBuilder.find_by_table_name(params[:table_name])

    view_builder.hidden_columns = view_builder.hidden_columns | [params[:view_builder][:hidden_columns][:column]]

    respond_to do |format|
      if view_builder.save
        format.js { render action: 'show/success' }
      else
        format.js { render action: 'show/failure', status: :unprocessable_entity }
      end
    end
  end

  def show_column
    view_builder = ViewBuilder.find_by_table_name(params[:table_name])

    view_builder.hidden_columns =  view_builder.hidden_columns - [params[:view_builder][:hidden_columns][:column]]

    respond_to do |format|
      if view_builder.save
        format.js { render action: 'show/success' }
      else
        format.js { render action: 'show/failure', status: :unprocessable_entity }
      end
    end
  end

  private

  def set_target_db_repo
    @target_db_repo = Kuwinda::Repository::TargetDB.new(params[:table])
  end

  def set_activities
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
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

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def set_current_table
    @current_table = params[:table]
  end
end
