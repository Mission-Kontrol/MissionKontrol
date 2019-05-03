# frozen_string_literal: true

require 'rails_helper'

describe TaskQueue do
  let(:a_task_queue) { described_class.new }

  it 'responds to name' do
    expect(a_task_queue).to respond_to(:name)
  end

  it 'responds to details' do
    expect(a_task_queue).to respond_to(:details)
  end

  it 'responds to query_builder_rules' do
    expect(a_task_queue).to respond_to(:query_builder_rules)
  end

  it 'responds to to_sql' do
    expect(a_task_queue).to respond_to(:to_sql)
  end

  it 'responds to table' do
    expect(a_task_queue).to respond_to(:table)
  end

  it 'is invalid without a name' do
    a_task_queue.name = nil
    a_task_queue.valid?
    expect(a_task_queue.errors.keys).to include(:name)
  end

  it 'is invalid without a table' do
    a_task_queue.table = nil
    a_task_queue.valid?
    expect(a_task_queue.errors.keys).to include(:table)
  end

  describe 'to_sql' do
    it "is empty by default"

    it 'returns correct sql when query builder rules are present' do
      rules = {
        "condition": "AND",
        "rules": [
          {
            "id" => "sign_in_count",
            "field" => "sign_in_count",
            "type" => "integer",
            "input" => "number",
            "operator" => "equal",
            "value" => 22
          },
          {
            "id" => "reset_password_token",
            "field" => "reset_password_token",
            "type" => "string",
            "input" => "text",
            "operator" => "equal",
            "value" => "9u5utojf89hh"
          }
        ],
        "valid": true
      }

      task_queue = described_class.new
      task_queue.query_builder_rules = rules.to_json
      task_queue.table = "users"
      expected = "select * from users where sign_in_count = 22 and reset_password_token = '9u5utojf89hh';"

      actual = task_queue.to_sql

      expect(actual).to eq(expected)
    end
  end
end
