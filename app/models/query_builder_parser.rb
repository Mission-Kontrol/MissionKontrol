# frozen_string_literal: true

class QueryBuilderParser
  attr_accessor :rules,
                :condition,
                :sql_literal

  def initialize(rules:, condition: nil)
    self.rules = rules
    self.condition = condition.downcase if condition
    self.sql_literal = ""
  end

  def to_sql
    # if a condition is present then assume multiple rules otherwise
    # assume a single rule and skip the condition on the last rule
    if condition
      rules.each_with_index do |rule, index|
        args = {}
        args[:column_type] = rule[:type]
        args[:column_name] = rule[:id]
        args[:column_value] = rule[:value]
        args[:operator] = operator(rule[:operator])
        args[:operator_string] = rule[:operator]
        args[:condition] = condition unless index == rules.size - 1
        self.sql_literal = build_sql(args: args)
      end
    else
      args = {}
      args[:column_type] = rules[0][:type]
      args[:column_name] = rules[0][:id]
      args[:column_value] = rules[0][:value]
      args[:operator] = operator(rules[0][:operator])
      args[:operator_string] = rules[0][:operator]
      self.sql_literal = build_sql(args: args)
    end

    self.sql_literal.prepend("where ")
    self.sql_literal += ";"
    sql_literal
  end

  private

  def operator(operator)
    return '=' if operator == 'equal' || operator == 'is_empty'
    return '<>' if operator == 'not_equal' || operator == 'is_not_empty'
    return 'IS' if operator == 'is_null'
    return 'IS NOT' if operator == 'is_not_null'
    return '<' if operator == 'less'
    return '<=' if operator == 'less_or_equal'
    return '>' if operator == 'greater'
    return '>=' if operator == 'greater_or_equal'
    return 'ILIKE'  if operator == 'begins_with' || operator == 'contains' || operator == 'ends_with'
    return 'NOT ILIKE' if operator == 'not_begins_with' || operator == 'not_contains' || operator == 'not_ends_with'
    return 'BETWEEN' if operator == 'between'
    return 'NOT BETWEEN' if operator == 'not_between'
    raise "unknown operator - #{operator}"
  end

  def build_sql(args: {})
    send("build_sql_for_#{args[:column_type]}", args)
  end

  def build_sql_for_integer(args)
    if args[:operator_string] == "is_null" || args[:operator_string] == "is_not_null"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} null"
    elsif args[:operator_string] == "between"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value][0]} AND #{args[:column_value][1]}"
    elsif args[:operator_string] == "not_between"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value][0]} AND #{args[:column_value][1]}"
    else
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value]}"
    end

    self.sql_literal += " #{args[:condition].downcase} " if args[:condition]
    sql_literal
  end

  def build_sql_for_string(args)
    if args[:operator_string] == "is_null" || args[:operator_string] == "is_not_null"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} null"
    elsif args[:operator_string] == "begins_with" || args[:operator_string] == "not_begins_with"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}%'"
    elsif args[:operator_string] == "contains" || args[:operator_string] == "not_contains"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '%#{args[:column_value]}%'"
    elsif args[:operator_string] == "ends_with" || args[:operator_string] == "not_ends_with"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '%#{args[:column_value]}'"
    elsif args[:operator_string] == "is_empty" || args[:operator_string] == "is_not_empty"
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} ''"
    else
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}'"
    end

    self.sql_literal += " #{args[:condition].downcase} " if args[:condition]
    sql_literal
  end
end
