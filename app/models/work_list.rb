# frozen_string_literal: true

class WorkList < ApplicationRecord
  FAILURE_TIMEOUT_INTERVALS = [
    ['1 hour', 1],
    ['2 hour', 2],
    ['3 hour', 3]
  ].freeze

  QUERY_CONDITIONS = [
    'equal'
  ].freeze

  validates :name, presence: true
  after_initialize :add_default_filter
  after_initialize :add_default_outcome

  def to_sql
    result = ''
    result + generate_db_select_sql + ' ' + generate_filters_sql + ';'
  end

  private

  def generate_db_select_sql
    "select * from #{data_table_name}"
  end

  def generate_filters_sql
    result = ''
    sql_filters.each do |filter_attributes|
      sql_filter = filter_attributes['sql_filter']
      filter = SQLFilterFactory.build_sql_filter(sql_filter)
      result += filter.to_sql
    end
    result
  end

  def add_default_filter
    return if sql_filters.present?
    filter = SQLFilter::Equal.new
    sql_filters << { 'sql_filter' => filter.to_hash }
  end

  def add_default_outcome
    return if outcomes.present?
    outcome = {
      'title' => '',
      'detail' => ''
    }
    outcomes << { 'outcome' => outcome }
  end
end
