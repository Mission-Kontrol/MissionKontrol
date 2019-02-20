# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListAvailableTables

      def initialize(database)
        @database = database
      end

      def call
        # Kuwinda::UseCase::DatabaseConnection.new.execute
        tables = database.connection.tables - ['schema_migrations']
        tables.map
      rescue Kuwinda::Gateway::InvalidClientDatabaseError
        []
      end

      private

      attr_reader :database
    end
  end
end
