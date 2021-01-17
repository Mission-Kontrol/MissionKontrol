# frozen_string_literal: true

class TablesController < ApplicationController
  include TableActivity
  include TableRender
  include DatabasePresenterActions
  include RelatableTables
  include TaskQueueRender

  layout 'standard'

  IGNORED_COLUMNS = %w[id created_at updated_at].freeze

  before_action :set_current_table,
                :check_license

  before_action :set_database, :set_databases
  before_action :check_user_permissions, only: %i[show]
  before_action :set_main_table, only: :show
  before_action :set_activities, only: :preview

  before_action :target_db, except: :index
  before_action :set_nested_table, except: %i[add_record create_record index delete_record update_settings update_table_field]

  def index
    set_database
    @available_tables = tables_with_view_permission(@database.id, available_tables)

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
    @task_queue = TaskQueue.find(params[:task_queue_id]) if params[:task_queue_id]
    if @task_queue
      existing_outcomes = @task_queue.task_queue_outcomes.select do |outcome|
        outcome.task_queue_item_primary_key == params[:record_id] &&
          (outcome.task_queue_item_reappear_at && outcome.task_queue_item_reappear_at >= Date.today)
      end

      task_queue_records = build_query_for_preview(@task_queue, nil, nil).rows
      task_queue_records.map.with_index { |array, index| @index = index if array.first == params[:record_id].to_i }

      @record_id = task_queue_records[@index + 1].try(:first)
      @task_queue = existing_outcomes&.any? ? nil : @task_queue
    end

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

    if params[:commit]
      update_editable_fields(@table_settings, editable_field_params)
    elsif (params[:value] == 'N/A' || params[:value] == 'Disable') && params[:setting] == 'nested_table'
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

  def edit_record
    set_main_table
    @table_settings = TargetTableSetting.find_by(name: @table, database_id: @database.id)
    editable_columns_for_form
    @records = []
    params[:records_array].each do |record_id|
      record = @target_db.find(@table, record_id)
      @records << record if record
    end
  rescue SqlDatabaseError => e
    @error = :Unknown
    @error_message = e
  end

  def create_record
    @target_db.create_record(params[:table], record_params)
  rescue UnableToSaveRecordError
    @error = :Unknown
    @error_message = 'Sorry, the Id field is not an integer so we cannot create a new record'
  rescue ActiveRecord::NotNullViolation => e
    @error = :NullViolation
    field = e.to_s.split('value in column ').last.split(' violates').first.split('\"').last
    @error_message = "Unable to save record if #{field} is blank. Please fill in this field and try again."
  rescue ActiveRecord::RecordNotUnique => e
    @error = :NotUnique
    field = e.to_s.split('Key (').last.split(')=').first
    @error_message = "Unable to save record as #{field} already exists. Please change this field and try again."
  rescue ActiveRecord::StatementInvalid => e
    @error = :Unknown
    @error_message = e.message
  rescue ActiveRecord::ActiveRecordError
    @error = :Unknown
    @error_message = 'Unable to save record. Please check your values and try again'
  end

  def update_record
    not_authorized = !current_admin_user.permission?(:edit, @current_table, @database.id)
    raise NotAuthorizedError.new if not_authorized

    record_params.each do |record_id, values|
      values.each do |field, value|
        @target_db.update_record(params[:table], field, value, record_id)
      end
    end

  rescue UnableToSaveRecordError
    @error = :Unknown
    @error_message = 'Sorry, unable to save the record. Please check your values and try again.'
  rescue ActiveRecord::NotNullViolation => e
    @error = :NullViolation
    field = e.to_s.split('value in column ').last.split(' violates').first.split('\"').last
    @error_message = "Unable to save record if #{field} is blank. Please fill in this field and try again."
  rescue ActiveRecord::RecordNotUnique => e
    @error = :NotUnique
    field = e.to_s.split('Key (').last.split(')=').first
    @error_message = "Unable to save record as #{field} already exists. Please change this field and try again."
  rescue ActiveRecord::StatementInvalid => e
    @error = :Unknown
    @error_message = e.message
  rescue ActiveRecord::ActiveRecordError
    @error = :Unknown
    @error_message = 'Unable to save record. Please check your values and try again'
  end

  def delete_record
    not_authorized = !current_admin_user.permission?(:delete, @current_table, @database.id)
    raise NotAuthorizedError.new if not_authorized

    sql_result = @target_db.delete_record(delete_params[:table], delete_params[:records_array])
    @result = (sql_result != 0)
  end

  private

  def check_user_permissions
    return if current_admin_user.permission?(:view, @current_table, @database.id)

    flash[:alert] = 'You do not have sufficient permissions to access that table'
    redirect_to(dashboard_path)
  end

  def tables_with_view_permission(database_id, tables)
    tables.select { |table| current_admin_user.permission?(:view, table, database_id) }
  end

  def set_databases
    @databases = Database.all.sort
  end

  def target_db
    @target_db ||= Kuwinda::Repository::TargetDB.new(database_connection)
  end

  def set_database
    ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
    @database = Database.find(database_params)
  rescue ActiveRecord::ConnectionNotEstablished
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)

    @database = Database.find(database_params)
  end

  def set_main_table
    @table = params[:table]
  end

  def database_connection
    # set_database
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
    begin
      @current_table_settings = TargetTableSetting.find_by(name: @current_table, database_id: @database.id)
      nested_table_state = DataTableState.find_by(table: @current_table_settings.nested_table) if @current_table_settings&.nested_table

      @nested_column_names = nested_table_state ? nested_column_names(nested_table_state) : []
    rescue ActiveRecord::StatementInvalid
      if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
        ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        retry if ActiveRecord::Base.connection.active?
      end
    end
  end

  def nested_column_names(nested_table_state)
    begin
      nested_column_names = []

      nested_table_state.visible_columns.each do |value|
        nested_column_names << @target_db.table_columns(@current_table_settings.nested_table)[value.to_i].try(:name)
      end
    rescue ActiveRecord::StatementInvalid
      if Rails.configuration.database_configuration[Rails.env]["database"] != ActiveRecord::Base.connection_db_config.configuration_hash[:database]
        ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        retry if ActiveRecord::Base.connection.active?
      end
    end

    nested_column_names.compact
  end

  def set_columns_for_form
    columns = @target_db.table_columns(@table)
    editable_fields = @table_settings.editable_fields
    @inputs = []

    columns.map do |column|
      next if IGNORED_COLUMNS.include? column.name

      @inputs << {
        name: column.name,
        type: column.type,
        required: !column.null || editable_fields[column.name]['mandatory']
      }
    end
  end

  def editable_columns_for_form
    columns = @target_db.table_columns(@table)
    editable_fields = @table_settings.editable_fields
    @inputs = []

    columns.map do |column|
      next if column.name == 'id'

      next unless editable_fields[column.name]['editable']

      @inputs << {
        name: column.name,
        type: column.type,
        required: !column.null || editable_fields[column.name]['mandatory']
      }
    end
  end

  def record_params
    params.require(:record).permit!
  end

  def database_params
    params[:database_id] || params[:id]
  end

  def editable_field_params
    params.require(:editable_fields).permit!
  end

  def update_editable_fields(settings, editable_params)
    editable_params.each do |field|
      value = field.first
      settings.editable_fields[value] = {
        editable: ActiveModel::Type::Boolean.new.cast(editable_params[value]['editable']),
        mandatory: ActiveModel::Type::Boolean.new.cast(editable_params[value]['mandatory'])
      }
    end

    new_nested_table = params['nested_table'] == 'Disable' ? nil : params['nested_table']

    @table_settings.update_attribute(:nested_table, new_nested_table)
  end
end
