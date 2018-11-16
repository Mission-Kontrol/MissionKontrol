# frozen_string_literal: true

class WorkList < ApplicationRecord
  FAILURE_TIMEOUT_INTERVALS = [
    ['1 hour', 1],
    ['2 hour', 2],
    ['3 hour', 3]
  ]

  validates :name, presence: true
  after_initialize :add_default_filter
  after_initialize :add_default_outcome

  def to_sql
    result = ""
    result += generate_db_select_sql
    result += " "
    result += generate_filters_sql
    result += ";"
  end

  private

  def generate_db_select_sql
    "select * from #{self.data_table_name}"
  end

  def generate_filters_sql
    result = ""
    self.sql_filters.each do |filter_attributes|
      filter = SQLFilterFactory.build_sql_filter(filter_attributes["sql_filter"])
      result += filter.to_sql
    end
    result
  end

  def add_default_filter
    unless self.sql_filters.present?
      filter = SQLFilter::Equal.new
      self.sql_filters << { 'sql_filter' => filter.to_hash }
    end
  end

  def add_default_outcome
    unless self.outcomes.present?
      outcome = {
        'title' => '',
        'detail' => ''
      }

      self.outcomes << { 'outcome' => outcome }
    end
  end
end
