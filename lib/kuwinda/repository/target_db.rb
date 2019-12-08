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
        query("select * from #{table};", limit, offset)
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
        query("select * from #{table} where #{foreign_key_title}=#{foreign_key_value}", limit, offset)
      end

      def update_record(table, field, value, id)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        conn.exec_query(sql)
      end

      def update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
        conn.exec_query(sql)
      end

      def create_record(table, record_params)
        last_id_sql = "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
        last_id = conn.exec_query(last_id_sql).rows.first.first
        fields = '(id, '
        values = "(#{last_id + 1}, "

        record_params.each do |field, value|
          column = table_columns.select { |table_column| table_column.name == field }.first
          fields += "#{field}, "
          if (column.type == :datetime || column.type == :inet || column.type == :integer) && value == ''
            values += 'NULL, '
          else
            values += "'#{value}', "
          end
        end
        fields += 'created_at, updated_at)'

        values += "'#{DateTime.now}', '#{DateTime.now}')"
        sql = "INSERT INTO #{table} #{fields} VALUES #{values}"
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

      def table_columns
        conn.columns(table)
      end

      def datatable_filter(search_value = nil, columns = nil, limit = nil, offset = nil)
        return all(limit, offset) if search_value.blank? || columns.nil?

        result = search_columns(search_value, columns, limit, offset)

        result
      end

      # rubocop:disable Metrics/ParameterLists
      def find_all_related_search(search_value, foreign_key_title, foreign_key_value, columns = nil, limit = 10, offset = nil)
        all = find_all_related(foreign_key_title, foreign_key_value, limit, offset)

        return all if search_value.blank? || columns.nil?

        result = search_columns_related_table(search_value, foreign_key_title, foreign_key_value, columns, limit, offset)

        result
      end
      # rubocop:enable Metrics/ParameterLists

      private

      def search_columns(search_value = nil, columns = nil, limit = nil, offset = nil)
        result = nil
        current_organisation = OrganisationSetting.last

        columns.each do |_key, value|
          next unless value['searchable']

          if current_organisation.target_database_type == 'postgresql'
            filter = postgres_search(table, value, search_value, limit, offset)
          else
            filter = non_postgres_search(table, value, search_value, limit, offset)
          end
          next if filter.nil? || filter.rows.empty?

          result = create_result(filter, result)
        end
        result
      end

      # rubocop:disable Metrics/ParameterLists
      def search_columns_related_table(search_value, foreign_key_title, foreign_key_value, columns, limit = nil, offset = nil)
        result = nil
        current_organisation = OrganisationSetting.last

        columns.each do |_key, value|
          next unless value['searchable']

          if current_organisation.target_database_type == 'postgresql'
            filter = postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit, offset)
          else
            filter = non_postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit, offset)
          end
          next if filter.nil? || filter.rows.empty?

          result = create_result(filter, result)
        end
        result
      end
      # rubocop:enable Metrics/ParameterLists

      def postgres_search(table, value, search_value, limit = nil, offset = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string

        query("SELECT * FROM #{table} WHERE #{value['data']} ILIKE '%#{search_value}%'", limit, offset)
      end

      # rubocop:disable Metrics/ParameterLists
      def postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = nil, offset = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string

        query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} ILIKE '%#{search_value}%'", limit, offset)
      end
      # rubocop:enable Metrics/ParameterLists

      def non_postgres_search(table, value, search_value, limit = nil, offset = nil)
        query("SELECT * FROM #{table} WHERE #{value['data']} LIKE '%#{search_value}%'", limit, offset)
      end

      # rubocop:disable Metrics/ParameterLists
      def non_postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = nil, offset = nil)
        query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} LIKE '%#{search_value}%'", limit, offset)
      end
      # rubocop:enable Metrics/ParameterLists

      def create_result(filter, result = nil)
        if result.nil?
          result = filter
        else
          filter.rows.each do |row|
            result.rows << row unless result.rows.include?(row)
          end
        end
        result
      end
    end
  end
end
