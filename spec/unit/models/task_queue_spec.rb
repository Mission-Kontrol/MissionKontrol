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

  it 'responds to query_builder_sql' do
    expect(a_task_queue).to respond_to(:query_builder_sql)
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
    it "is empty when query builder sql is not present" do
      task_queue = described_class.new
      task_queue.table = "users";

      expect(task_queue.to_sql).to eq("")
    end

    it 'returns correct sql when query builder sql is present' do
      task_queue = described_class.new
      task_queue.table = "users";
      task_queue.query_builder_sql = "id >= 1 AND email IS NOT NULL";

      expect(task_queue.to_sql).to eq("select * from users where id >= 1 AND email IS NOT NULL;")
    end
  end
end
