module SQLFilter
  class Equal < SQLFilter::Base
    def initialize(args={})
      args[:kind] = "equal"
      super(args)
    end

    def to_sql
      if operator
        "#{operator} #{self.column} = '#{self.value}' "
      else
        "where #{self.column} = '#{self.value}' "
      end
    end

    def to_hash
      hash = {}
      hash['kind'] = self.kind
      hash['column'] = self.column
      hash['operator'] = self.operator
      hash['value'] = self.value
      hash
    end
  end
end
