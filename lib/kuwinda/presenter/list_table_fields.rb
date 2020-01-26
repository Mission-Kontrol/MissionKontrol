# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableFields
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        database.connection.columns(table.downcase).map(&:name)
      end

      private

      attr_reader :database, :table
    end
  end
end
