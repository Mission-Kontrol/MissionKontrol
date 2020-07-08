# frozen_string_literal: true

module Kuwinda
  module Presenter
    class ListTableFieldsWithType
      def initialize(database, table)
        @database = database
        @table = table
      end

      def call
        Rails.cache.fetch("table_fields_with_type/#{database.database.friendly_name}/#{table}", expires_in: 12.hours) do
          fields = database.connect.connection.columns(table.downcase).map{|f| [f.name, f.type.to_s, table]}
          ActiveRecord::Base.connection_pool.disconnect!
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])
          fields
        end
      end

      def related_fields
        Rails.cache.fetch("related_table_fields_with_type/#{database.database.friendly_name}/#{table}", expires_in: 12.hours) do
          fields = database.connect.connection.columns(table.downcase).map{|f| ["#{table}.#{f.name}", f.type.to_s, table]}
          ActiveRecord::Base.connection_pool.disconnect!
          ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[Rails.env.to_sym])

          fields
        end
      end

      private

      attr_reader :database, :table
    end
  end
end
