# frozen_string_literal: true

module Kuwinda
  module Gateway
    class DatabaseConnectionGateway
      def initialize(database)
        @database = database
      end

      def connect
        if db_invalid?
          raise InvalidClientDatabaseError.new("Client database is invalid")
        end

        credentials = database_credentials(database)

        ActiveRecord::Base.establish_connection(credentials)
      end

      private

      attr_reader :database

      def decrypt_password(password)
        crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
        crypt.decrypt_and_verify(password)
      end

      def database_credentials(database)
        credentials = {
          adapter: Kuwinda::DatabaseAdapter.adapter(database.adapter),
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
