# frozen_string_literal: true

module Kuwinda
  module UseCase
    class DatabaseConnection
      def initialize(database = nil)
        @gateway = database_connection_gateway
        @database = database
      end

      def execute
        gateway.connect(database)
      end

      private

      attr_reader :gateway, :database

      def database_connection_gateway
        Kuwinda::Gateway::DatabaseConnectionGateway.new
      end
    end
  end
end
