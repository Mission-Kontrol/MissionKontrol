# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListAvailableTables

      def initialize(database)
        @database = database
      end

      def call
        tables = database.connection.tables - ['schema_migrations']
        tables.map
      end

      private

      attr_reader :database
    end
  end
end
