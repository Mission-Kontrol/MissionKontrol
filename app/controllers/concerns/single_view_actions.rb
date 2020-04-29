# frozen_string_literal: true

module SingleViewActions
  extend ActiveSupport::Concern

  private

  def tables_with_layouts
    tables_with_layouts = []
    available_tables.select do |table|
      tables_with_layouts << table if ViewBuilder.find_by(table_name: table, database_id: @database.id).present?
    end
    tables_with_layouts
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
