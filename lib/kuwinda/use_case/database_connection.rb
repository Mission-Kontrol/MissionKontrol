# frozen_string_literal: true

module Kuwinda
  module UseCase
    class DatabaseConnection
      def initialize
        @gateway = database_connection_gateway
      end

      def execute
        gateway.connect
      end

      private

      attr_reader :gateway

      def database_connection_gateway
        Kuwinda::Gateway::DatabaseConnectionGateway.new
      end
    end
  end
end
