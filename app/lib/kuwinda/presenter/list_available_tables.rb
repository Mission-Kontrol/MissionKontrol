# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListAvailableTables

      def initialize(database)
        @database = database
      end

      def call
        tables = database.connect.connection.tables - ['schema_migrations']
        ActiveRecord::Base.connection_pool.disconnect!
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[:development])
        tables.map.to_a

        # ActiveRecord::Base.connection_pool.disconnect!
        # ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[:development])
        # Rails.cache.fetch("available_tables/#{database.db_config.database}", expires_in: 12.hours) do
        #   tables = database.connection.tables - ['schema_migrations']
        #   tables.map.to_a
        # end
      end

      private

      attr_reader :database
    end
  end
end
