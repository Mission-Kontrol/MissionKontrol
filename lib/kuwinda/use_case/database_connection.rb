module Kuwinda
  module UseCase
    class DatabaseConnection
      def initialize(gateway: nil)
        @gateway = gateway
      end

      def execute
        gateway.connect
      end

      private

      attr_reader :gateway

      def gateway
        Kuwinda::Gateway::DatabaseConnectionGateway.new
      end
    end
  end
end
