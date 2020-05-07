# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableFieldsWithType
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        Rails.cache.fetch("table_fields_with_type/#{database.spec.config[:database]}/#{table}", expires_in: 12.hours) do
          database.connection.columns(table.downcase).map{|f| [f.name, f.type.to_s, table]}
        end
      end

      private

      attr_reader :database, :table
    end
  end
end
