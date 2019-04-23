# frozen_string_literal: true

require 'rails_helper'

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
    return '=' if operator == 'equal'
    return '<>' if operator == 'not_equal'
    return 'IS' if operator == 'is_null'
    return 'IS NOT' if operator == 'is_not_null'
    return '<' if operator == 'less'
    return '<=' if operator == 'less_or_equal'
    return '>' if operator == 'greater'
    return '>=' if operator == 'greater_or_equal'
    raise "unknown operator - #{operator}"
  end

  def build_sql(args: {})
    send("build_sql_for_#{args[:column_type]}", args)
  end

  def build_sql_for_integer(args)
    if args[:condition]
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value]} #{args[:condition].downcase} "
    else
      if args[:operator_string] == "is_null" || args[:operator_string] == "is_not_null"
        self.sql_literal += "#{args[:column_name]} #{args[:operator]} null"
      else
        self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value]}"
      end
    end
  end

  def build_sql_for_string(args)
    if args[:condition]
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}' #{args[:condition].downcase} "
    else
      if args[:operator_string] == "is_null" || args[:operator_string] == "is_not_null"
        self.sql_literal += "#{args[:column_name]} #{args[:operator]} null"
      else
        self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}'"
      end
    end
  end
end

describe QueryBuilderParser do
  let(:a_query_builder_parser) { described_class.new(rules: [], condition: nil) }

  it 'responds to #rules' do
    expect(a_query_builder_parser).to respond_to(:rules)
  end

  it 'responds to #condition' do
    expect(a_query_builder_parser).to respond_to(:condition)
  end

  it 'responds to #sql_literal' do
    expect(a_query_builder_parser).to respond_to(:sql_literal)
  end

  it 'responds to #to_sql' do
    expect(a_query_builder_parser).to respond_to(:to_sql)
  end

  describe "#to_sql" do
    context "when there is a single rule" do
      context "and the rule operator is 'equal'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "sign_in_count",
                  "field": "sign_in_count",
                  "type": "integer",
                  "input": "number",
                  "operator": "equal",
                  "value": 0
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where sign_in_count = 0;')
          end
        end

        context "and the data type is a string" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "email",
                  "field": "email",
                  "type": "string",
                  "input": "text",
                  "operator": "equal",
                  "value": "foo@bar.com"
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq("where email = 'foo@bar.com';")
          end
        end
      end

      context "and the rule operator is 'not equal'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "not_equal",
                  "value": 3
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id <> 3;')
          end
        end

        context "and the data type is a string" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "email",
                  "field": "email",
                  "type": "string",
                  "input": "text",
                  "operator": "not_equal",
                  "value": "foo@bar.com"
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq("where email <> 'foo@bar.com';")
          end
        end
      end

      context "and the rule operator is 'is_null'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "is_null",
                  "value": nil
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id IS null;')
          end
        end

        context "and the data type is a string" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "email",
                  "field": "email",
                  "type": "string",
                  "input": "text",
                  "operator": "is_null",
                  "value": nil
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq("where email IS null;")
          end
        end
      end

      context "and the rule operator is 'is_not_null'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "is_not_null",
                  "value": nil
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id IS NOT null;')
          end
        end

        context "and the data type is a string" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "email",
                  "field": "email",
                  "type": "string",
                  "input": "text",
                  "operator": "is_not_null",
                  "value": nil
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq("where email IS NOT null;")
          end
        end
      end

      context "and the rule operator is 'less'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "less",
                  "value": 6
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id < 6;')
          end
        end
      end

      context "and the rule operator is 'less_or_equal'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "less_or_equal",
                  "value": 6
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id <= 6;')
          end
        end
      end

      context "and the rule operator is 'greater'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "greater",
                  "value": 6
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id > 6;')
          end
        end
      end

      context "and the rule operator is 'greater_or_equal'" do
        context "and the data type is an integer" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "id",
                  "field": "id",
                  "type": "integer",
                  "input": "number",
                  "operator": "greater_or_equal",
                  "value": 6
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules])
            expect(query_builder.to_sql).to eq('where id >= 6;')
          end
        end
      end
    end

    context "when there are multiple rules" do
      context "and they are joined by 'AND'" do
        context "and the rule operator is 'equal'" do
          it "returns correct sql" do
            rules = {
              "condition": "AND",
              "rules": [
                {
                  "id": "sign_in_count",
                  "field": "sign_in_count",
                  "type": "integer",
                  "input": "number",
                  "operator": "equal",
                  "value": 22
                },
                {
                  "id": "reset_password_token",
                  "field": "reset_password_token",
                  "type": "string",
                  "input": "text",
                  "operator": "equal",
                  "value": "9u5utojf89hh"
                }
              ],
              "valid": true
            }

            query_builder = described_class.new(rules: rules[:rules], condition: rules[:condition])
            expect(query_builder.to_sql).to eq("where sign_in_count = 22 and reset_password_token = '9u5utojf89hh';")
          end
        end
      end
    end
  end
end
