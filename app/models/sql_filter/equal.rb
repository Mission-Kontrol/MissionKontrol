# frozen_string_literal: true

module SQLFilter
  class Equal < SQLFilter::Base
    def initialize(args = {})
      args[:kind] = 'equal'
      super(args)
    end

    def to_sql
      if operator
        "#{operator} #{column} = '#{value}' "
      else
        "where #{column} = '#{value}' "
      end
    end

    def to_hash
      hash = {}
      hash['kind'] = kind
      hash['column'] = column
      hash['operator'] = operator
      hash['value'] = value
      hash
    end
  end
end
