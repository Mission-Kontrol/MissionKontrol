# frozen_string_literal: true

class FakeActiveRecord
  COLUMNS = %w[name]

  def respond_to_missing?(method_name)
    COLUMNS.include?(method_name.to_s) || super
  end

  def method_missing(method_name, *args)
    if respond_to?(method_name)
      instance_variable_get("@#{method_name}")
    else
      super
    end
  end

  def self.define_attribute_methods
    COLUMNS.each do |name|
      define_method(name) { instance_variable_get("@#{name}") }
    end
  end
end