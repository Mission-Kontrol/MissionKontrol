# frozen_string_literal: true

module Kuwinda
  module Repository
    class TargetDB
      attr_accessor :database,
                    :conn

      def initialize(database)
        @database = database
        @conn = database.connect.connection
      end

      def all(table, limit = 10, offset = nil, order_column = nil, order_dir = nil)
        query("select * from #{table};", limit, offset, order_column, order_dir)
      end

      # rubocop:disable Style/GuardClause, Lint/UselessAssignment
      def find(table, id)
        sql = "select * from #{table} where id=#{id};"
        retries = 0
        if id.is_a? String
          sql = "select * from #{table} where id='#{id}';"
        else
          sql = "select * from #{table} where id=#{id};"
        end

        result = execute_query(sql)
        ActiveRecord::Base.connection_pool.disconnect!
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
        result.nil? ? result : result.first
      rescue ActiveRecord::StatementInvalid => e
        if (retries += 1) <= 2
          sql = "select * from #{table} where id='#{id}';"
          result = conn.exec_query(sql)
          ActiveRecord::Base.connection_pool.disconnect!
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
          result.nil? ? result : result.first
        else
          raise SqlDatabaseError.new(e.message)
        end
      end
      # rubocop:enable Style/GuardClause, Lint/UselessAssignment

      def find_related(table, foreign_key_title, foreign_key_value)
        sql = "select * from #{table} where #{foreign_key_title}=#{foreign_key_value};"

        result = execute_query(sql)

        result.nil? ? result : result.first
      end

      def find_all_related(table, foreign_key_title, foreign_key_value, limit = 10, offset = nil)
        if foreign_key_value.is_a? Integer
          query("select * from #{table} where #{foreign_key_title}=#{foreign_key_value}", limit, offset)
        else
          query("select * from #{table} where #{foreign_key_title}='#{foreign_key_value}'", limit, offset)
        end
      end

      # rubocop:disable Style/GuardClause, Lint/UselessAssignment
      def update_record(table, field, value, id)
        updated_at_exists = table_columns(table).map(&:name).include?('updated_at')
        if field == 'updated_at' && updated_at_exists
          sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        elsif updated_at_exists
          sql = "UPDATE #{table} SET #{field} = '#{value}', updated_at = '#{DateTime.now.utc.to_s(:db)}' WHERE id=#{id};"
        else
          sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
        end
        retries = 0
        result = execute_query(sql)
        ActiveRecord::Base.connection_pool.disconnect!
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
        result
      rescue ActiveRecord::StatementInvalid => e
        if (retries += 1) <= 2
          if field == 'updated_at' && updated_at_exists
            sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id='#{id}';"
          elsif updated_at_exists
            sql = "UPDATE #{table} SET #{field} = '#{value}', updated_at = '#{DateTime.now.utc.to_s(:db)}' WHERE id='#{id}';"
          else
            sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE id='#{id}';"
          end
          result = execute_query(sql)
          ActiveRecord::Base.connection_pool.disconnect!
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
          result
        else
          raise UnableToSaveRecordError.new(e.message)
        end
      rescue ActiveRecord::NotNullViolation => e
        raise ActiveRecord::NotNullViolation(e.message)
      rescue ActiveRecord::RecordNotUnique => e
        raise ActiveRecord::RecordNotUnique(e.message)
      rescue ActiveRecord::ActiveRecordError
        raise ActiveRecord::ActiveRecordError
      end
      # rubocop:enable Style/GuardClause, Lint/UselessAssignment

      def update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        sql = "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
        result = execute_query(sql)

        result
      end

      def create_record(table, record_params)
        last_id_sql = "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
        last_id_response = conn.exec_query(last_id_sql)
        last_id = last_id_response.rows.first.nil? ? 0 : last_id_response.rows.first.first

        raise UnableToSaveRecordError.new('Sorry, Id field is not an integer so we cannot add a new record') unless last_id.is_a? Integer

        fields = '(id, '
        values = "(#{last_id + 1}, "
        field_types = %i[datetime inet integer string boolean time]
        table_columns = table_columns(table)
        record_params.each do |field, value|
          column = table_columns.select { |table_column| table_column.name == field }.first
          fields += "#{field}, "

          if field_types.include?(column.type) && value.empty?
            values += column.default ? (column.default + ', ') : 'NULL, '
          else
            values += "'#{value}', "
          end
        end
        if table_columns.map(&:name).include?('created_at') && table_columns.map(&:name).include?('updated_at')
          fields += 'created_at, updated_at)'

          values += "'#{DateTime.now.utc.to_s(:db)}', '#{DateTime.now.utc.to_s(:db)}')"
        else
          fields_size = fields.size
          fields = fields[0..fields_size - 3] + ')'
          size = values.size
          values = values[0..size - 3] + ')'
        end
        sql = "INSERT INTO #{table} #{fields} VALUES #{values}"
        result = execute_query(sql)
        ActiveRecord::Base.connection_pool.disconnect!
        ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
        result
      rescue ActiveRecord::StatementInvalid
        raise ActiveRecord::StatementInvalid
      rescue ActiveRecord::NotNullViolation
        raise ActiveRecord::NotNullViolation
      rescue ActiveRecord::RecordNotUnique
        raise ActiveRecord::RecordNotUnique
      rescue ActiveRecord::ActiveRecordError
        raise ActiveRecord::ActiveRecordError
      end

      def delete_record(table, records_array)
        records = records_array.join(', ')

        sql = "DELETE FROM #{table} WHERE id IN (#{records});"
        begin
          result = conn.exec_delete(sql)
        rescue ActiveRecord::StatementInvalid, PG::ConnectionBad, Mysql2::Error
          conn = database.connect.connection
          result = conn.exec_delete(sql)
        ensure
          ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        end
        result
      end

      def query(sql, limit = 10, offset = 0, order_column = nil, order_dir = nil)
        query_string = sql.split(';')
        if order_column.present? && order_dir.present?
          query_string = "#{query_string[0]} ORDER BY #{order_column} #{order_dir};"
        else
          query_string = sql
        end
        new_query_string = query_string.split(';').first
        new_query_string = "#{new_query_string} limit #{limit || 10} offset #{offset || 0};"
        result = execute_query(new_query_string)

        result
      rescue ActiveRecord::StatementInvalid
        nil
      end

      def count(table)
        sql = "SELECT COUNT(*) FROM #{table};"
        result = execute_query(sql)

        result
      end

      def count_related(table, foreign_key_title, foreign_key_value)
        foreign_key_value = search_value_integer(foreign_key_value)

        if foreign_key_value.is_a? Integer
          sql = "SELECT COUNT(*) FROM #{table} WHERE #{foreign_key_title}=#{foreign_key_value};"
        else
          sql = "SELECT COUNT(*) FROM #{table} WHERE #{foreign_key_title}='#{foreign_key_value}';"
        end
        result = execute_query(sql)

        result
      end

      def table_columns(table)
        begin
          result = conn.columns(table)
        rescue ActiveRecord::StatementInvalid, PG::ConnectionBad, Mysql2::Error
          conn = database.connect.connection
          result = conn.columns(table)
        ensure
          ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        end
        result
      end

      # rubocop:disable Metrics/ParameterLists
      def datatable_filter(database, table, search_value = nil, columns = nil, limit = 10, offset = nil, order_column = nil, order_dir = nil)
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
      def search_columns(database, table, search_value = nil, columns = nil, limit = 10, offset = nil, order_column = nil, order_dir = nil)
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
      def search_columns_related_table(database, table, search_value, foreign_key_title, foreign_key_value, columns, limit = 10, offset = nil)
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
      def postgres_search(table, value, search_value, limit = 10, offset = nil, order_column = nil, order_dir = nil)
        conn = database.connect.connection
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = search_value_integer(search_value)

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{value['data']} = #{search_value}", limit, offset, order_column, order_dir)
        else
          query("SELECT * FROM #{table} WHERE #{value['data']} ILIKE '%#{search_value}%'", limit, offset, order_column, order_dir)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = 10, offset = nil)
        conn = database.connect.connection
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = search_value_integer(search_value)

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} = #{search_value}", limit, offset)
        else
          query("SELECT * FROM #{table} WHERE #{foreign_key_title} = #{foreign_key_value} AND #{value['data']} ILIKE '%#{search_value}%'", limit, offset)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def non_postgres_search(table, value, search_value, limit = 10, offset = nil, order_column = nil, order_dir = nil)
        conn = database.connect.connection
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = search_value_integer(search_value)

        if search.is_a? Integer
          query("SELECT * FROM #{table} WHERE #{value['data']} = #{search_value}", limit, offset, order_column, order_dir)
        else
          query("SELECT * FROM #{table} WHERE #{value['data']} LIKE '%#{search_value}%'", limit, offset, order_column, order_dir)
        end
      end
      # rubocop:enable Metrics/ParameterLists

      # rubocop:disable Metrics/ParameterLists
      def non_postgres_related_search(table, value, search_value, foreign_key_title, foreign_key_value, limit = 10, offset = nil)
        conn = database.connect.connection
        table_columns = conn.columns(table)
        column = table_columns.select { |c| c.name == value['data'] }.first

        return if column.sql_type_metadata.type != :string && column.sql_type_metadata.type != :text && column.sql_type_metadata.type != :integer

        search = search_value_integer(search_value)

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

      def execute_query(sql)
        begin
          result = conn.exec_query(sql)
        rescue ActiveRecord::StatementInvalid, PG::ConnectionBad, Mysql2::Error
          conn = database.connect.connection
          result = conn.exec_query(sql)
        ensure
          ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
        end
        result
      end

      # rubocop disable Style/RescueModifier, Lint/LiteralAsCondition
      def search_value_integer(search_value)
        Integer(search_value) rescue nil ? Integer(search_value) : search_value
      end
      # rubocop enable Style/RescueModifier, Lint/LiteralAsCondition
    end
  end
end
