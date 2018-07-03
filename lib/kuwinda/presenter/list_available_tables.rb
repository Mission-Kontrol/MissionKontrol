module Kuwinda
  module Presenter
    class ListAvailableTables
      def initialize(database)
        @database = database
      end

      def call
        database.connection.tables - ['schema_migrations']
      end

      private

      attr_reader :database
    end
  end
end
