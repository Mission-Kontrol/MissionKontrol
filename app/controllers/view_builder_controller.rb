# frozen_string_literal: true

class ViewBuilderController < ApplicationController
  layout 'dashboard'
  skip_before_action :verify_authenticity_token

  def new
    @available_tables = available_tables
  end

  def show; end

  def table_fields
    @fields = list_table_fields(params[:table])
    render json: @fields
  end

  def create
    @view_builder = ViewBuilder.new(table_name: field_params[:table],
                                    table_attributes: table_attributes(field_params[:selectedOptions]))

    if @view_builder.save!
      render 'configure_table_order', view_builder: @view_builder
    end
  end

  def update
    @view_builder = ViewBuilder.find(params[:id])

    @view_builder.table_attributes = configure_attributes(params[:tableConfigurations])

    @view_builder.table_attributes[:default_rows] = params[:defaultRows]

    if @view_builder.save!
      render 'something'
    end
  end

  def configure_table_order

  end

  private

  def list_table_fields(table)
    Kuwinda::Presenter::ListTableFields.new(ClientRecord, table).call
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def field_params
    params.permit(:table, selectedOptions: [])
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
end
