# frozen_string_literal: true

module Kuwinda
  module Gateway
    class InvalidClientDatabaseError < StandardError; end

    class DatabaseConnectionGateway
      def connect
        unless client_db_is_valid?
          raise InvalidClientDatabaseError.new("invalid client database, please review credentials.")
        end

        ActiveRecord::Base.establish_connection(client_db)
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
