# frozen_string_literal: true

module SQLFilter
  class Base
    attr_accessor :kind,
                  :column,
                  :value,
                  :operator

    def initialize(args = {})
      self.kind = args[:kind]
      self.column = args[:column]
      self.value = args[:value]
      self.operator = args[:operator]
    end
  end
end
