# frozen_string_literal: true

class LayoutBuilderController < ApplicationController
  layout 'layout_builder', only: [:new, :edit]
  layout 'dashboard', only: [:index]
  skip_before_action :verify_authenticity_token
  before_action :load_view_builder, only: %i[show update view_page edit]

  def new
    @available_tables = available_tables
    @layout_setting = LayoutSetting.new
  end

  def show
    @view_builder = ViewBuilder.find(params[:id])
  end

  def index
    @view_builders = ViewBuilder.all.sort
  end

  def table_fields
    @fields = list_table_fields(params[:table])
    render json: @fields
  end

  def table_fields_with_type
    @fields_with_type = list_table_fields_with_type(params[:table])
    render json: @fields_with_type
  end

  def create
    @view_builder = ViewBuilder.new(view_name: params[:view_name],
                                    table_name: field_params[:table])

    if @view_builder.save!
      render json: @view_builder
    end

    # if @view_builder.save!
    #   render 'configure_table_order', view_builder: @view_builder
    # end
  end

  def update
    # respond_to :js
    @view_builder = ViewBuilder.find(params[:id])

    update_attributes(@view_builder, params)

    if @view_builder.save!

      respond_to do |format|
        format.js { render 'layout_builder/update/success' }
      end
    end
  end

  def retrieve_data
    @view_builder = ViewBuilder.find(params[:viewBuilderId])
    data = retrieve_data_from_database(params[:userId], @view_builder)
    render json: data
  end

  def view_page; end

  def edit
    # @view_builder = ViewBuilder.find(params[:id])
    @available_tables = available_tables
    @layout_setting = LayoutSetting.find_by_layout_id(@view_builder.id) || LayoutSetting.new
  end

  private

  def load_view_builder
    @view_builder = ViewBuilder.find(params[:id])
  end

  def retrieve_data_from_database(query_limiter, view_builder)
    query = query_limiter.empty? ? '' : "WHERE user_id = #{query_limiter}"
    Kuwinda::Presenter::RetrieveData.new(ClientRecord, view_builder, query).call
  end

  def list_table_fields(table)
    Kuwinda::Presenter::ListTableFields.new(ClientRecord, table).call
  end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(ClientRecord, table).call
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def field_params
    params.permit(:view_name, :table, selectedOptions: [])
  end

  def table_attributes(field_params)
    table_attributes = {}

    field_params.each_with_index do |i, field|
      next if i.nil?
      table_attributes[field] = i
    end

    { 'visible_fields': table_attributes }
  end

  def configure_attributes(field_params)
    table_attributes = {}

    field_params.as_json.each do |_k, value|
      table_attributes[value['Position']] = value['Field']
    end

    { 'visible_fields': table_attributes }
  end

  def update_attributes(view_builder, params)
    # view_builder.table_attributes = configure_attributes(params[:tableConfigurations])
    # view_builder.table_attributes[:default_rows] = params[:defaultRows]
    view_builder.status = params[:status] if params[:status]
    view_builder.view_name = params[:name] if params[:name]
    view_builder.commentable = params[:view_builder][:commentable] if params[:view_builder][:commentable]
    view_builder.show_status = params[:view_builder][:show_status] if params[:view_builder][:show_status]
    view_builder.table_name = params[:view_builder][:table_name] if params[:view_builder][:table_name]
    view_builder.parent_comment_table = params[:view_builder][:parent_comment_table] if params[:view_builder][:parent_comment_table]
    # binding.pry
  end

  # def handle_success(action:, js_func:, notice:)
  #   flash[:notice] = notice
  #   render(action: action, js: js_func)
  # end
end
