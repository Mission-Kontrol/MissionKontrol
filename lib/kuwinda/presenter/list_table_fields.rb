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

# query_string = "SELECT * FROM events WHERE user_id = #{user_id}"
# response = database.connection.exec_query(query_string)
# key = response.columns
# values = response.rows
#
# @objects = []
#
# values.each do |value|
#   @objects << Hash[*key.zip(value).flatten]
# end
#
# @objects
