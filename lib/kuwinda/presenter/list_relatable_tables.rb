# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListRelatableTables
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        table_relationships
      end

      private

      attr_reader :table, :database

      def all_tables_and_fields
        @hash_of_tables_and_columns = {}
        database.connection.tables.each do |table|
          @hash_of_tables_and_columns[table] = []
          database.connection.columns(table).each do |column|
            @hash_of_tables_and_columns[table] << column.name
          end
        end
        @hash_of_tables_and_columns
      end

      def table_relationships
        tables = []
        all_tables_and_fields.each do |table_name, table_fields|
          tables << table_name if table_fields.include?("#{convert_table_name(table)}_id")
        end
        tables
      end

      def convert_table_name(table)
        ies = table.end_with?('ies')
        pluralization = ies ? 'ies' : 's'
        table = table.chomp(pluralization)
        table = ies ? table + 'y' : table
        table.downcase
      end
    end
  end
end
