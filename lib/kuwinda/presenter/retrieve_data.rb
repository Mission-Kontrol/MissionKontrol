# frozen_string_literal: true

module Kuwinda
  module Presenter
    class RetrieveData
      def initialize(database, view_builder, query_limiter)
        @database = database
        @query_limiter = query_limiter
        @view_builder = view_builder
      end

      def call
        query_string = "SELECT #{query_fields} FROM #{table} WHERE #{query_limiter}"
        response = database.connection.exec_query(query_string)

        display_results(response)
      end

      private

      attr_reader :database, :view_builder, :query_limiter

      def query_fields
        view_builder.table_headers.join(', ')
      end

      def table
        view_builder.table_name
      end

      def display_results(response)
        result = {}
        response.rows.each_with_index do |index, row|
          result[row] = index
        end
        result
      end
    end
  end
end
