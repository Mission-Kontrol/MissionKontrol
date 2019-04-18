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
        args[:condition] = condition unless index == rules.size - 1
        self.sql_literal = build_sql(args: args)
      end
    else
      args = {}
      args[:column_type] = rules[0][:type]
      args[:column_name] = rules[0][:id]
      args[:column_value] = rules[0][:value]
      args[:operator] = operator(rules[0][:operator])
      self.sql_literal = build_sql(args: args)
    end

    self.sql_literal.prepend("where ")
    self.sql_literal += ";"
    sql_literal
  end

  private

  def operator(operator)
    return '=' if operator == 'equal'
    raise "unknown operator - #{operator}"
  end

  def build_sql(args: {})
    send("build_sql_for_#{args[:column_type]}", args)
  end

  def build_sql_for_integer(args)
    if args[:condition]
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value]} #{args[:condition].downcase} "
    else
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} #{args[:column_value]}"
    end
  end

  def build_sql_for_string(args)
    if args[:condition]
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}' #{args[:condition].downcase} "
    else
      self.sql_literal += "#{args[:column_name]} #{args[:operator]} '#{args[:column_value]}'"
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
