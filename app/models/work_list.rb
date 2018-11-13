# frozen_string_literal: true

class WorkList < ApplicationRecord
  FAILURE_TIMEOUT_INTERVALS = [
    ['1 hour', 1],
    ['2 hour', 2],
    ['3 hour', 3]
  ]

  # def sql_filters_as_hash
  #   JSON.parse(self.sql_filters)
  # end

  def add_sql_filter(filter)
    if self.sql_filters.size > 0
      last_filter = sql_filters.sort_by { |k| k['id'] }.last
      filter.id = last_filter['id'] + 1
      self.sql_filters << filter.to_hash
    else
      filter.id = 1
      self.sql_filters << filter.to_hash
    end
  end

  def remove_sql_filter(filter)
    existing_filter = self.sql_filters.select { |h| h["id"] == filter.id }.last
    return unless existing_filter
    self.sql_filters.delete_if { |h| h["id"] == existing_filter['id'] }
  end
end
