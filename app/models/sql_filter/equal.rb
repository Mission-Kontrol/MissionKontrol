module SQLFilter
  class Equal < SQLFilter::Base
    def to_sql
      if operator
        "where #{self.column} = #{self.value} #{operator} "
      else
        "where #{self.column} = #{self.value} "
      end
    end

    def to_hash
      hash = {}
      hash['kind'] = self.kind
      hash['column'] = self.column
      hash['operator'] = self.operator
      hash['value'] = self.value
      hash['id'] = self.id
      hash
    end

    private

    def initialize
      args = {}
      args[:kind] = "equal"
      super(args)
    end
  end
end
