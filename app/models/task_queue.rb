# frozen_string_literal: true

class TaskQueue < ApplicationRecord
  validates :name, :table, presence: true

  def to_sql
    result = ""
    return result if query_builder_rules.blank?
    query_builder = JSON.parse(query_builder_rules)

    if query_builder["rules"].size > 1
      query_builder_parser = QueryBuilderParser.new(rules: query_builder["rules"], condition: query_builder["condition"])
    else
      query_builder_parser = QueryBuilderParser.new(rules: query_builder["rules"])
    end

    result += "select * from #{table} #{query_builder_parser.to_sql}"
  end
end
