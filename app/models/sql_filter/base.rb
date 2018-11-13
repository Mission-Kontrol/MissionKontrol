module SQLFilter
  class Base
    attr_accessor :kind,
                  :column,
                  :value,
                  :id,
                  :operator

    def initialize(args={})
      self.id = args[:id]
      self.kind = args[:kind]
      self.column = args[:column]
      self.value = args[:value]
      self.operator = args[:operator]
    end
  end
end
