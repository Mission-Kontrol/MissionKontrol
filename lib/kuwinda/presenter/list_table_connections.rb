# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableConnections
      def initialize(database, table, user_id)
        @database = database
        @table = table
        @user_id = user_id
      end

      def call
        query_string = "SELECT * FROM events WHERE user_id = #{user_id}"
        response = database.connection.exec_query(query_string)
        key = response.columns
        values = response.rows

        @objects = []

        values.each do |value|
          @objects << Hash[*key.zip(value).flatten]
        end

        @objects
      end

      private

      attr_reader :database, :table, :user_id
    end
  end
end
