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
end
