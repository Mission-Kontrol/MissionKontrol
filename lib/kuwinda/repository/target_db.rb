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

      def all(limit = nil, offset = nil)
        if limit && offset
          sql = "select * from #{table} limit #{limit} offset #{offset};"
        elsif limit
          sql = "select * from #{table} limit #{limit};"
        else
          sql = "select * from #{table};"
        end

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

      def find_all_related(foreign_key_title, foreign_key_value, limit = 10, offset = nil)
        if limit && offset
          sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value} limit #{limit} offset #{offset};"
        elsif limit
          sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value} limit #{limit};"
        else
          sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value};"
        end

        conn.exec_query(sql)
      end

      def update_record(table, field, value, id)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        conn.exec_query(sql)
      end

      def update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
        conn.exec_query(sql)
      end

      def query(sql, limit, offset)
        if limit && offset
          query_string = sql.split(';')
          query_string = "#{query_string[0]} limit #{limit} offset #{offset};"
        elsif limit
          query_string = sql.split(';')
          query_string = "#{query_string[0]} limit #{limit};"
        else
          query_string = sql
        end
        conn.exec_query(query_string)
      end

      def count
        sql = "SELECT COUNT(*) FROM #{table};"
        conn.exec_query(sql)
      end

      def count_related(foreign_key_title, foreign_key_value)
        sql = "SELECT COUNT(*) FROM #{table} WHERE #{foreign_key_title}=#{foreign_key_value};"
        conn.exec_query(sql)
      end

      def datatable_filter(search_value = nil, columns = nil, limit = nil, offset = nil)
        return all(limit, offset) if search_value.blank? || columns.nil?

        result = nil

        columns.each do |_key, value|
          next unless value['searchable']

          filter = query("SELECT * FROM #{table} WHERE #{value['data']} LIKE '%#{search_value}%'", limit, offset)
          next if filter.rows.empty?

          if result.nil?
            result = filter
          else
            result.rows << filter.rows.flatten
          end
        end

        result
      end
    end
  end
end
