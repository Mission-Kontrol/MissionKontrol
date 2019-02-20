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

      def find_related(foreign_key_title, foreign_key_value)
        sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value};"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end

      def update_record(table, field, value, id)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        conn.exec_query(sql)
      end

      def update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
        conn.exec_query(sql)
      end

      def find_first
        sql = "select * from #{table} limit 1;"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end
    end
  end
end
