# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListAvailableTables

      def initialize(database)
        @database = database
      end

      def call
        if database.connected? 
          tables = database.connection.tables - ['schema_migrations']
          tables.map
        else
          []
        end
      end

      private

      attr_reader :database
    end
  end
end
