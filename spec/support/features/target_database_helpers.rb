# frozen_string_literal: true

module Features
  module TargetDatabaseHelpers
    def connect_to_target_database
      @connection = establish_connection
      @connection.connection
    end

    def remove_connection_to_target_database
      ActiveRecord::Base.remove_connection(@connection)
    end

    def establish_connection
      ActiveRecord::Base.establish_connection(
        adapter: 'postgresql',
        host: ENV['DEMO_CLIENT_DB_HOST'],
        username: ENV['DEMO_CLIENT_DB_USER'],
        password: ENV['DEMO_CLIENT_DB_PASSWORD'],
        database: ENV['DEMO_CLIENT_DB_NAME'],
        port: ENV['DEMO_CLIENT_DB_PORT']
      )
    end
  end
end

RSpec.configure do |config|
  config.include Features::TargetDatabaseHelpers, type: :feature
end
