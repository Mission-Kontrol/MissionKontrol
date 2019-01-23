# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableFieldsWithType
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        database.connection.columns(table.downcase).map{|f| [f.name, f.type.to_s]}
      end

      private

      attr_reader :database, :table
    end
  end
end
