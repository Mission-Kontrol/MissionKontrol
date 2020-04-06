# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListAvailableTables

      def initialize(database)
        @database = database
      end

      def call
        Rails.cache.fetch("available_tables/#{database.spec.config[:database]}", expires_in: 12.hours) do
          tables = database.connection.tables - ['schema_migrations']
          tables.map.to_a
        end
      end

      private

      attr_reader :database
    end
  end
end
