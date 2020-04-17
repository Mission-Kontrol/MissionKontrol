# frozen_string_literal: true

class LayoutBuilderController < ApplicationController
  include UserAbilities

  layout 'layout_builder', only: [:new, :edit]
  layout 'standard', only: [:index, :preview]
  skip_before_action :verify_authenticity_token
  # before_action :load_available_tables,
  #               :authenticate_admin_user!
  before_action :authenticate_admin_user!
  before_action :load_task_queues, only: %i[show preview]
  before_action :check_user_editor_abilities
  before_action :set_database, only: %i[new create]

  def index
    @databases = Database.all
    @view_builders = ViewBuilder.all
  end

  def new
    @available_tables = available_tables
    @tables_with_layouts = tables_with_layouts
    @view_builder = ViewBuilder.new(table_name: field_params[:table], database_id: @database.id)

    ## TODO: Display the second modal here instead of edit as table still needs to be selected?
    if current_admin_user.ignore_layout_modal?
      if @view_builder.save!
        redirect_to action: 'edit', id: @view_builder.id
      end
    end
  end

  def show
    @view_builder = ViewBuilder.find(params[:id])
  end

  def table_fields_with_type
    @view_builder = ViewBuilder.find(params[:id])
    @database = Database.find(@view_builder.database_id)
    @database_connection = database_connection
    @fields_with_type = list_table_fields_with_type(params[:table])
    render json: @fields_with_type.sort
  end

  def edit
    @view_builder = ViewBuilder.find(params[:id])
    @database = Database.find(@view_builder.database_id)
    @database_connection = database_connection
    @available_tables = available_tables
    @relatable_tables = relatable_tables(@view_builder.table_name)
    @fields_with_type = list_table_fields_with_type(@view_builder.table_name)
    @target_db = Kuwinda::Repository::TargetDB.new(@database_connection)
    @row = @target_db.all(@view_builder.table_name, 1).rows.first.first
  end

  def create
    @view_builder = ViewBuilder.find_or_create_by(table_name: field_params[:table], database_id: @database.id)

    if @view_builder.save!
      if current_admin_user.ignore_layout_modal.to_s != field_params[:ignore_modal]
        current_admin_user.update_attribute(:ignore_layout_modal, field_params[:ignore_modal])
      end
      render json: @view_builder
    end
  end

  def update
    @view_builder = ViewBuilder.find(params[:id])
    update_attributes(@view_builder, params)

    if @view_builder.save!

      respond_to do |format|
        format.js { render 'layout_builder/update/success' }
      end
    end
  end

  def update_related_tables
    @layout = ViewBuilder.find(params[:id])
    @layout.related_tables |= [params['related_table']]

    if @layout.save
      respond_to do |format|
        format.js { render 'layout_builder/update/success' }
      end
    end
  end

  def remove_related_table
    @layout = ViewBuilder.find(params[:id])
    @layout.related_tables = @layout.related_tables - [params['related_table']]

    if @layout.save
      respond_to do |format|
        format.js { render 'layout_builder/update/success' }
      end
    end
  end

  def preview
    @layout_builder = ViewBuilder.find(params[:id])
    @target_db = Kuwinda::Repository::TargetDB.new(@layout_builder.table_name)
    @rows = @target_db.all(5)

    respond_to do |format|
      format.js { render action: 'edit/success' }
      format.html { render action: 'preview' }
    end

  rescue ActiveRecord::StatementInvalid => e
    @rows = []

    respond_to do |format|
      format.js { render action: 'edit/error' }
    end
  end

  private

  def set_database
    @database = Database.find(params[:database_id])
  end

  def database_connection
    @database_connection = Kuwinda::UseCase::DatabaseConnection.new(@database).execute
  end

  def load_view_builder
    @view_builder = ViewBuilder.find(params[:id])
  end

  ## TODO: these three are duplicate, move into concern
  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(@database_connection, table).call
  end

  def set_relatable_tables
    @relatable_tables = []

    relatable_tables(@current_table).each do |table|
      layout = ViewBuilder.find_by_table_name(table)
      relative = {}
      # @target_db.table = table
      foreign_key_title = helpers.get_foreign_key(params[:table_name])
      foreign_key_value = params[:record_id]
      sql_result = @target_db.find_all_related(table, foreign_key_title, foreign_key_value, 10, 0)
      relative[:headers] = sql_result ? sql_result.columns : []
      relative[:name] = table
      @relatable_tables << relative
    end

    @relatable_tables
  end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(@database_connection, table).call
  end

  def tables_with_layouts
    tables_with_layouts = []
    available_tables.select do |table|
      tables_with_layouts << table if ViewBuilder.find_by(table_name: table).present?
    end
    tables_with_layouts
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(database_connection).call
    # Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def field_params
    params.permit(:view_name, :table, :ignore_modal, selectedOptions: [])
  end

  def update_attributes(view_builder, params)
    view_builder.status = params[:status] if params[:status]
    view_builder.view_name = params[:name] if params[:name]

    if params[:view_builder]
      view_builder.commentable = params[:view_builder][:commentable] if params[:view_builder][:commentable]
      view_builder.show_status = params[:view_builder][:show_status] if params[:view_builder][:show_status]
      view_builder.table_name = params[:view_builder][:table_name] if params[:view_builder][:table_name]
      view_builder.parent_comment_table = params[:view_builder][:parent_comment_table] if params[:view_builder][:parent_comment_table]
      view_builder.draggable_fields_header_container1 = params[:view_builder][:draggable_fields_header_container1] if params[:view_builder][:draggable_fields_header_container1]
      view_builder.draggable_fields_header_container2 = params[:view_builder][:draggable_fields_header_container2] if params[:view_builder][:draggable_fields_header_container2]
      view_builder.draggable_fields_side_container = params[:view_builder][:draggable_fields_side_container] if params[:view_builder][:draggable_fields_side_container]
      view_builder.draggable_fields_main_container1 = params[:view_builder][:draggable_fields_main_container1] if params[:view_builder][:draggable_fields_main_container1]
      view_builder.draggable_fields_main_container2 = params[:view_builder][:draggable_fields_main_container2] if params[:view_builder][:draggable_fields_main_container2]
      view_builder.draggable_fields_main_container3 = params[:view_builder][:draggable_fields_main_container3] if params[:view_builder][:draggable_fields_main_container3]
      view_builder.hidden_columns = params[:view_builder][:hidden_columns] if params[:view_builder][:hidden_columns]
      view_builder.callable_fields = params[:view_builder][:callable_fields] if params[:view_builder][:callable_fields]
    end
  end
end
