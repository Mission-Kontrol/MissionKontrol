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

      def decrypt_password(password)
        crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
        crypt.decrypt_and_verify(password)
      end

      def database_credentials(database)
        credentials = {
          adapter: adapter(database.adapter),
          username: database.username,
          password: decrypt_password(database.password),
          port: database.port,
          host: database.host,
          database: database.name
        }
        credentials
      end

      def db_invalid?
        return true if database.nil?

        !database.valid?
      end
    end
  end
end
