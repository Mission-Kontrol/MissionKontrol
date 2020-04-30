# frozen_string_literal: true

class LayoutBuilderController < ApplicationController
  include UserAbilities
  include TableActivity
  include DatabasePresenterActions
  include RelatableTables
  include SingleViewActions

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
    database_connection
    @available_tables = available_tables
    @tables_with_layouts = tables_with_layouts
    @view_builder = ViewBuilder.new(table_name: field_params[:table], database_id: @database.id)
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
    ## TODO: FIX THIS (if no row, then what?)
    @target_db = Kuwinda::Repository::TargetDB.new(@database_connection)
    @row = @target_db.all(@view_builder.table_name, 1).rows.try(:first).try(:first) || 1
  end

  def create
    @view_builder = ViewBuilder.create(table_name: field_params[:table], view_name: field_params[:view_name], database_id: @database.id)

    if @view_builder.save!
      if current_admin_user.ignore_layout_modal.to_s != field_params[:ignore_modal]
        current_admin_user.update_attribute(:ignore_layout_modal, field_params[:ignore_modal])
      end
      render json: @view_builder
    end
  end

  def update
    @view_builder = ViewBuilder.find(params[:id])
    ## TODO: don't allow all params
    update_attributes(@view_builder, params)
    if @view_builder.save!

      respond_to do |format|
        format.js { render 'layout_builder/update/success' }
      end
    end
  end

  def update_related_tables
    ## TODO: make view_builder/layout consistent everywhere
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

  ## TODO: is this actually being used??
  # def preview
  #   @layout_builder = ViewBuilder.find(params[:id])
  #   @target_db = Kuwinda::Repository::TargetDB.new(@layout_builder.table_name)
  #   @rows = @target_db.all(5)

  #   respond_to do |format|
  #     format.js { render action: 'edit/success' }
  #     format.html { render action: 'preview' }
  #   end

  # rescue ActiveRecord::StatementInvalid => e
  #   @rows = []

  #   respond_to do |format|
  #     format.js { render action: 'edit/error' }
  #   end
  # end

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
end
