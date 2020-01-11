# frozen_string_literal: true

module Kuwinda
  module Gateway
    class DatabaseConnectionGateway
      def connect(database = nil)
        unless client_db_is_valid?
          raise InvalidClientDatabaseError.new("Client database is invalid")
        end

        credentials = database ? database_credentials(database) : client_db
        ActiveRecord::Base.establish_connection(credentials)
      end

      private

      def adapter(scheme)
        case scheme
        when 'postgresql', 'postgres'
          return 'postgresql'
        when 'mysql', 'mysql2'
          return 'mysql2'
        else
          raise "don't know how to make adpater for #{scheme}"
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

      def client_db
        if Rails.env == 'test'
          uri = URI.parse(ENV['CLIENT_DATABASE_URL'])

          return {
            adapter: adapter(uri.scheme),
            username: uri.user,
            password: uri.password,
            port: uri.port,
            host: uri.host,
            database: uri.path.from(1)
          }
        else
          return {
            adapter: adapter(SensitiveData.get_target_database_credential(:database_type)),
            username: SensitiveData.get_target_database_credential(:database_username),
            password: SensitiveData.get_target_database_credential(:database_password),
            port: SensitiveData.get_target_database_credential(:database_port),
            host: SensitiveData.get_target_database_credential(:database_host),
            database: SensitiveData.get_target_database_credential(:database_name)
          }
        end
      end

      def client_db_is_valid?
        return true if Rails.env == 'test'

        credentials = %i[database_type
                          database_username
                          database_port database_host
                          database_name
                          database_password]



        credentials.each do |credential|
          if SensitiveData.get_target_database_credential(credential).blank?
            return false
            break
          end
        end

        true
      end
    end
  end
end
