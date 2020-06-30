# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableFields
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        Rails.cache.fetch("table_fields/#{database.spec.config[:database]}/#{table}", expires_in: 12.hours) do
          fields = database.connect.connection.columns(table.downcase).map(&:name)
          ActiveRecord::Base.connection_pool.disconnect!
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[:development])

          fields
        end
      end

      private

      attr_reader :database, :table
    end
  end
end
