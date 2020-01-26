# frozen_string_literal: true

module Features
  module TargetDatabaseHelpers
    def connect_to_target_database(database)
      @connection = establish_connection(database)
      @connection.connection
    end

    def remove_connection_to_target_database
      ActiveRecord::Base.remove_connection(@connection)
    end

    def establish_connection(database)
      ActiveRecord::Base.establish_connection(
        adapter: database.adapter,
        host: database.host,
        username: database.username,
        password: database.password,
        database: database.name,
        port: database.port
      )
    end
  end
end

RSpec.configure do |config|
  config.include Features::TargetDatabaseHelpers, type: :feature
end
