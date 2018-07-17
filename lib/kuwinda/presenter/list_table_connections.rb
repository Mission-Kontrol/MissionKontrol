module Kuwinda
  module Presenter
    class ListTableConnections
      def initialize(database, table, user_id)
        @database = database
        @table = table
        @user_id = user_id
      end

      def call
        query = database.connection.exec_query("SELECT * FROM events WHERE user_id = #{user_id}")
        key = query.columns
        values = query.rows

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
