# frozen_string_literal: true

module Kuwinda
  module Repository
    class TargetDB
      attr_accessor :database,
                    :conn

      def initialize(database)
        @conn = database.connection
      end

      def all(table, limit = nil, offset = nil, order_column = nil, order_dir = nil)
        query("select * from #{table};", limit, offset, order_column, order_dir)
      end

      def find(table, id)
        sql = "select * from #{table} where id=#{id};"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end

      def find_related(table, foreign_key_title, foreign_key_value)
        sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value};"
        result = conn.exec_query(sql)
        result.nil? ? result : result.first
      end

      def find_all_related(table, foreign_key_title, foreign_key_value, limit = 10, offset = nil)
        query("select * from #{table} where #{foreign_key_title}=#{foreign_key_value}", limit, offset)
      end

      def update_record(table, field, value, id)
        if field == 'updated_at'
          sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        else
          sql = "UPDATE #{table} SET #{field} = '#{value}', updated_at = '#{DateTime.now.utc.to_s(:db)}' WHERE id=#{id};"
        end
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
        field_types = %i[datetime inet integer string boolean time]

        record_params.each do |field, value|
          column = table_columns(table).select { |table_column| table_column.name == field }.first
          fields += "#{field}, "

          if field_types.include?(column.type) && value.empty?
            values += column.default ? (column.default + ', ') : 'NULL, '
          else
            values += "'#{value}', "
          end
        end
        fields += 'created_at, updated_at)'

        values += "'#{DateTime.now.utc.to_s(:db)}', '#{DateTime.now.utc.to_s(:db)}')"
        sql = "INSERT INTO #{table} #{fields} VALUES #{values}"
        conn.exec_query(sql)
      end

      def delete_record(table, records_array)
        records = records_array.join(', ')

        sql = "DELETE FROM #{table} WHERE id IN (#{records});"
        conn.exec_delete(sql)
      end

      def query(sql, limit, offset, order_column = nil, order_dir = nil)
        if order_column.present? && order_dir.present?
          query_string = sql.split(';')
          query_string = "#{query_string[0]} ORDER BY #{order_column} #{order_dir};"
        else
          query_string = sql
        end

        if limit && offset
          query_string = query_string.split(';')
          query_string = "#{query_string[0]} limit #{limit} offset #{offset};"
        elsif limit
          query_string = query_string.split(';')
          query_string = "#{query_string[0]} limit #{limit};"
        else
          query_string = sql
        end

        conn.exec_query(query_string)
      rescue ActiveRecord::StatementInvalid
        nil
      end

      def count(table)
        sql = "SELECT COUNT(*) FROM #{table};"
        conn.exec_query(sql)
      end

      def count_related(table, foreign_key_title, foreign_key_value)
        sql = "SELECT COUNT(*) FROM #{table} WHERE #{foreign_key_title}=#{foreign_key_value};"
        conn.exec_query(sql)
      end

      def table_columns(table)
        conn.columns(table)
      end

      # rubocop:disable Metrics/ParameterLists
      def datatable_filter(database, table, search_value = nil, columns = nil, limit = nil, offset = nil, order_column = nil, order_dir = nil)
        return all(table, limit, offset, order_column, order_dir) if search_value.blank? || columns.nil?

        result = search_columns(database, table, search_value, columns, limit, offset, order_column, order_dir)

        result
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def find_all_related_search(database, table, search_value, foreign_key_title, foreign_key_value, columns = nil, limit = 10, offset = nil)
        all = find_all_related(table, foreign_key_title, foreign_key_value, limit, offset)

        return all if search_value.blank? || columns.nil?

        result = search_columns_related_table(database, table, search_value, foreign_key_title, foreign_key_value, columns, limit, offset)

        result
      end
      # rubocop:enable Metrics/ParameterLists

      private

      # rubocop:disable Metrics/ParameterLists
      def search_columns(database, table, search_value = nil, columns = nil, limit = nil, offset = nil, order_column = nil, order_dir = nil)
        result = nil
        database_type = Kuwinda::DatabaseAdapter.adapter(database.adapter)
        columns.each do |_key, value|
          next unless value['searchable']
          next if value['data'].empty?

          if database_type == 'postgresql'
            filter = postgres_search(table, value, search_value, limit, offset, order_column, order_dir)
          else
            filter = non_postgres_search(table, value, search_value, limit, offset, order_column, order_dir)
          end
          next if filter.nil? || filter.rows.empty?

          result = create_result(filter, result)
        end
        result
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def search_columns_related_table(database, table, search_value, foreign_key_title, foreign_key_value, columns, limit = nil, offset = nil)
        result = nil
        database_type = Kuwinda::DatabaseAdapter.adapter(database.adapter)
        columns.each do |_key, value|
          next unless value['searchable']
          next if value['data'].empty?

          if database_type == 'postgresql'
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

      # rubocop:disable Metrics/ParameterLists
      def postgres_search(table, value, search_value, limit = nil, offset = nil, order_column = nil, order_dir = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = Integer(search_value) rescue nil ? Integer(search_value) : search_value

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{value['data']} = #{search_value}", limit, offset, order_column, order_dir)
        else
          query("SELECT * FROM #{table} WHERE #{value['data']} ILIKE '%#{search_value}%'", limit, offset, order_column, order_dir)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = nil, offset = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = Integer(search_value) rescue nil ? Integer(search_value) : search_value

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} = #{search_value}", limit, offset)
        else
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} ILIKE '%#{search_value}%'", limit, offset)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def non_postgres_search(table, value, search_value, limit = nil, offset = nil, order_column = nil, order_dir = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = Integer(search_value) rescue nil ? Integer(search_value) : search_value

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{value['data']} = #{search_value}", limit, offset, order_column, order_dir)
        else
          query("SELECT * FROM #{table} WHERE #{value['data']} LIKE '%#{search_value}%'", limit, offset, order_column, order_dir)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def non_postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = nil, offset = nil)
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = Integer(search_value) rescue nil ? Integer(search_value) : search_value

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} = #{search_value}", limit, offset)
        else
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} LIKE '%#{search_value}%'", limit, offset)
        end
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
