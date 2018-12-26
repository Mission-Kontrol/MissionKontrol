# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :load_view_builders,
                :load_target_db_tables,
                :load_target_db_table_and_column_name_hash

  private

  def load_view_builders
    @view_builders = ViewBuilder.where(status: 'active')
  end

  def load_target_db_tables
    @target_db_tables ||= ClientRecord.connection.tables
  end

  def load_target_db_table_and_column_name_hash
    @hash_of_tables_and_columns = {}
    ClientRecord.connection.tables.each do |table|
      @hash_of_tables_and_columns[table] = []
      ClientRecord.connection.columns(table).each do |column|
        @hash_of_tables_and_columns[table] << column.name
      end
    end
  end
end
