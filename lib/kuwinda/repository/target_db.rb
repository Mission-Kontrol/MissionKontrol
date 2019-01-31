# frozen_string_literal: true

module Kuwinda
  module Repository
    class TargetDB
      attr_accessor :table,
                    :conn

      def initialize(table = nil, conn = ClientRecord.connection)
        @table = table
        @conn = conn
      end

      def all
        sql = "select * from #{table};"
        conn.exec_query(sql)
      end

      def find(id)
        sql = "select * from #{table} where id=#{id};"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end

      def find_related(foreign_key, relatable_id)
        sql = "select * from #{table} where #{foreign_key}=#{relatable_id};"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end

      def update_row(row, value)
        sql = "UPDATE #{table} SET #{column} = #{value}, WHERE id=#{row['id']};"
        conn.exec_query(sql)
      end
    end
  end
end
