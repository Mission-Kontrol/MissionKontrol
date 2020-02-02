# frozen_string_literal: true

class LayoutBuilderController < ApplicationController
  include UserAbilities

  layout 'layout_builder', only: [:new, :edit]
  layout 'standard', only: [:index, :preview]
  skip_before_action :verify_authenticity_token
  before_action :load_available_tables,
                :authenticate_admin_user!
  before_action :load_task_queues, only: %i[show preview]
  before_action :check_user_editor_abilities

  def new
    @available_tables = available_tables
    @tables_with_layouts = tables_with_layouts
    @view_builder = ViewBuilder.new(table_name: field_params[:table])

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
    @fields_with_type = list_table_fields_with_type(params[:table])
    render json: @fields_with_type.sort
  end

  def create
    @view_builder = ViewBuilder.find_or_create_by(table_name: field_params[:table])

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

  def edit
    @view_builder = ViewBuilder.find(params[:id])
    @relatable_tables = relatable_tables(@view_builder.table_name)
    @fields_with_type = list_table_fields_with_type(@view_builder.table_name)
    @target_db = Kuwinda::Repository::TargetDB.new(@view_builder.table_name)
    @row = @target_db.all(1).rows.first.first
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

  def load_view_builder
    @view_builder = ViewBuilder.find(params[:id])
  end

  def tables_with_layouts
    tables_with_layouts = []
    available_tables.select do |table|
      tables_with_layouts << table if ViewBuilder.find_by(table_name: table).present?
    end
    tables_with_layouts
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
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
