# frozen_string_literal: true

class SQLFilterFactory
  def self.build_sql_filter(filter_attributes)
    case filter_attributes['kind']
    when 'equal'
      build_equal_sql_filter(filter_attributes)
    end
  end

  def self.build_equal_sql_filter(filter_attributes)
    filter = SQLFilter::Equal.new
    filter.column = filter_attributes['column']
    filter.value = filter_attributes['value']
    filter.operator = filter_attributes['operator']
    filter
  end
end
