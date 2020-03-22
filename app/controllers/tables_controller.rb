# frozen_string_literal: true

class TablesController < ApplicationController
  include TableActivity
  include TableRender

  layout 'standard'

  IGNORED_COLUMNS = %w[id created_at updated_at].freeze

  before_action :set_current_table,
                :check_license

  before_action :target_db, except: :index
  before_action :set_main_table, only: :show
  before_action :set_nested_table, except: %i[add_record create_record index delete_record]
  before_action :check_user_permissions, only: %i[show]

  def index
    database_tables = Kuwinda::Presenter::ListAvailableTables.new(database_connection).call.to_a
    @available_tables = database_tables.select { |table| current_admin_user.permission?(:view, table, @database.id) }

    respond_to do |format|
      format.js { render json: @available_tables.sort.to_json }
    end
  end

  def show
    respond_to do |format|
      format.html do
        render_show_html(params[:table])
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
    @target_db.update_record(table_field_params[:table],
                                  table_field_params[:field],
                                  table_field_params[:value],
                                  table_field_params[:id])
  rescue ActiveRecord::StatementInvalid => e
    render json: {
      error: e.to_s
    }, status: 400
  end

  def update_related_table_field
    @target_db.update_related_record(related_table_field_params[:table],
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
    set_main_table
    @table_settings = TargetTableSetting.find_by(name: @table, database_id: @database.id)
    @related_tables = relatable_tables(@table)
  end

  def update_settings
    @table_settings = TargetTableSetting.find_by(name: params[:table], database_id: @database.id)

    if (params[:value] == 'N/A' || params[:value] == 'Disable') && params[:setting] == 'nested_table'
      @table_settings.update_attribute(:nested_table, nil)
    else
      @table_settings.update_attribute(params[:setting], params[:value])
    end
    @result = @table_settings.save
  end

  def add_record
    set_main_table
    @table_settings = TargetTableSetting.find_by(name: @table, database_id: @database.id)
    set_columns_for_form
  end

  def create_record
    @target_db.create_record(params[:table], record_params)
  rescue ActiveRecord::NotNullViolation => e
    @error = :NullViolation
    field = e.to_s.split('value in column ').last.split(' violates').first.split('\"').last
    @error_message = "Unable to save record if #{field} is blank. Please fill in this field and try again."
  rescue ActiveRecord::RecordNotUnique => e
    @error = :NotUnique
    field = e.to_s.split('Key (').last.split(')=').first
    @error_message = "Unable to save record as #{field} already exists. Please change this field and try again."
  rescue ActiveRecord::ActiveRecordError
    @error = :Unknown
  end

  def delete_record
    @result = @target_db.delete_record(delete_params[:table], delete_params[:records_array])
  end

  private

  def check_user_permissions
    return if current_admin_user.permission?(:view, @current_table, @database.id)

    flash[:alert] = 'You do not have sufficient permissions to access that table'
    redirect_to(dashboard_path)
  end

  def target_db
    @target_db ||= Kuwinda::Repository::TargetDB.new(database_connection)
  end

  def set_database
    @database = Database.find(database_params)
  end

  def set_main_table
    @table = params[:table]
  end

  def database_connection
    set_database
    @database_connection = Kuwinda::UseCase::DatabaseConnection.new(@database).execute
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

  def delete_params
    params.permit(:database_id, :table, records_array: [])
  end

  def table_has_layout?(table)
    ViewBuilder.where(table_name: table).size > 0
  end

  def set_layout_for_table
    @layout_for_table = ViewBuilder.where(table_name: @current_table).first
  end

  def set_current_table
    @current_table = params[:table] || params[:table_name]
  end

  def set_nested_table
    @current_table_settings = TargetTableSetting.find_by(name: @current_table, database_id: @database.id)
    nested_table_state = DataTableState.find_by(table: @current_table_settings.nested_table) if @current_table_settings.nested_table

    @nested_column_names = nested_table_state ? nested_column_names(nested_table_state) : []
  end

  def nested_column_names(nested_table_state)
    nested_column_names = []
    # nested_db_repo = Kuwinda::Repository::TargetDB.new(@current_table_settings.nested_table, database_connection)

    nested_table_state.visible_columns.each do |value|
      nested_column_names << @target_db.table_columns(@current_table_settings.nested_table)[value.to_i].name
    end

    nested_column_names
  end

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(database_connection, table).call
  end

  def set_columns_for_form
    columns = @target_db.table_columns(@table)
    @inputs = []

    columns.map do |column|
      next if IGNORED_COLUMNS.include? column.name

      @inputs << {
        name: column.name,
        type: column.type,
        required: !column.null
      }
    end
  end

  def record_params
    params.require(:record).permit!
  end

  def database_params
    params[:id] || params[:database_id]
  end
end
