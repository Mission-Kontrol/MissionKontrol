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
          database.connection.columns(table.downcase).map(&:name)
        end
      end

      private

      attr_reader :database, :table
    end
  end
end
