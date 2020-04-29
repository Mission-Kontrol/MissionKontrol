# frozen_string_literal: true

module DatabasePresenterActions
  extend ActiveSupport::Concern

  private

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(@database_connection, table).call
  end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(@database_connection, table).call
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(@database_connection).call
  end
end
