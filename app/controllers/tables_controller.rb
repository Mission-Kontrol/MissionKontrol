# frozen_string_literal: true

class TablesController < ApplicationController
  include TableActivity
  include TableRender

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
  before_action :check_user_permissions, only: %i[show]

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

  def settings
    @table = @target_db_repo.table
    @table_settings = TargetTableSetting.find_by(name: @table)
    @related_tables = relatable_tables(@table)
  end

  def update_settings
    @table_settings = TargetTableSetting.find_by(name: params[:table])
    @table_settings.update_attribute(params[:setting], params[:value])
    @result = @table_settings.save
  end

  private

  def check_user_permissions
    redirect_to(root_path) unless current_admin_user.permission?(:view, @current_table)
  end

  def set_target_db_repo
    @target_db_repo = Kuwinda::Repository::TargetDB.new(params[:table])
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

  def set_current_table
    @current_table = params[:table]
  end

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(ClientRecord, table).call
  end
end
