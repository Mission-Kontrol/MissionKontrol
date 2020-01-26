# frozen_string_literal: true

module Kuwinda
  module UseCase
    class DatabaseConnection
      def initialize(database)
        @database = database
        @gateway = database_connection_gateway
      end

      def execute
        gateway.connect
      end

      private

      attr_reader :gateway, :database

      def database_connection_gateway
        Kuwinda::Gateway::DatabaseConnectionGateway.new(database)
      end
    end
  end
end
