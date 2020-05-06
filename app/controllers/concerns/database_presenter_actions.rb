# frozen_string_literal: true

module DatabasePresenterActions
  extend ActiveSupport::Concern

  private

  def database_connection
    Kuwinda::UseCase::DatabaseConnection.new(@database).execute
  end

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(@database_connection, table).call
  end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(@database_connection, table).call
  end

  def available_tables
    @database_connection = database_connection
    Kuwinda::Presenter::ListAvailableTables.new(@database_connection).call
  end
end
