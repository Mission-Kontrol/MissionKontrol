# frozen_string_literal: true

module RelatableTables
  extend ActiveSupport::Concern

  private

  def set_relatable_tables
    @relatable_tables = []

    relatable_tables(@current_table).each do |table|
      # layout = ViewBuilder.find_by_table_name(table)
      relative = {}
      # @target_db.table = table
      foreign_key_title = helpers.get_foreign_key(params[:table_name])
      foreign_key_value = params[:record_id]
      sql_result = @target_db.find_all_related(table, foreign_key_title, foreign_key_value, 10, 0)
      relative[:headers] = sql_result ? sql_result.columns : []
      relative[:name] = table
      @relatable_tables << relative
    end

    @relatable_tables
  end
end
