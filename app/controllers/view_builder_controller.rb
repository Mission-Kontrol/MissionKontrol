# frozen_string_literal: true

class ViewBuilderController < ApplicationController
  layout 'dashboard'

  def new
    @available_tables = available_tables
  end

  def show
  end

  def table_fields
    @fields = list_table_fields(params[:table])
    render json: @fields
  end

  private

  def list_table_fields(table)
    Kuwinda::Presenter::ListTableFields.new(ClientRecord, table).call
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

end
