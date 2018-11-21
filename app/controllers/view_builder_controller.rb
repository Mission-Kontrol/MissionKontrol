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
      # format.html { render '/view_builder/table_order' }
    end
  end

  def update
    @view_builder = ViewBuilder.find(params[:id])

    @view_builder.table_attributes = table_attributes(params[:tableConfigurations])

    @view_builder.table_attributes.merge(default_rows: params[:defaultRow])
    render 'something'
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
      return if i.nil?
      table_attributes[field] = i
    end

    { 'visible_fields': table_attributes }
  end
end
