# frozen_string_literal: true

class WorkList < ApplicationRecord
  FAILURE_TIMEOUT_INTERVALS = [
    ['1 hour', 1],
    ['2 hour', 2],
    ['3 hour', 3]
  ]

  validates :name, presence: true
  after_initialize :add_default_filter

  def to_sql
    SQLFilterJoiner.join(filters: self.sql_filters)
  end

  private

  def add_default_filter
    unless self.sql_filters.present?
      filter = SQLFilter::Equal.new
      self.sql_filters << { 'sql_filter' => filter.to_hash }
    end
  end
end
