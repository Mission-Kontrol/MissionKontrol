# frozen_string_literal: true

module Kuwinda
  module Gateway
    class DatabaseConnectionGateway
      def initialize(database)
        @database = database
      end

      def connect
        if db_invalid?
          raise InvalidClientDatabaseError("Client database is invalid")
        end

        credentials = database_credentials(database)
        ActiveRecord::Base.establish_connection(credentials)
      end

      private

      attr_reader :database

      def adapter(scheme)
        case scheme
        when 'postgresql', 'postgres'
          return 'postgresql'
        when 'mysql', 'mysql2'
          return 'mysql2'
        else
          raise "do not know how to make adpater for #{scheme}"
        end
      end

      def database_credentials(database)
        {
          adapter: adapter(database.adapter),
          username: database.username,
          password: '278d5db10a01380f9437b9ad2e3ba7bc94952f3ac6530f1e470e69e61eef9863',
          port: database.port,
          host: database.host,
          database: database.name
        }
      end

      def db_invalid?
        return true if database.nil?

        !database.valid?
      end
    end
  end
end
