# frozen_string_literal: true

require 'rails_helper'

describe WorkList do
  let(:a_work_list) { described_class.new }

  it 'responds to name' do
    expect(a_work_list).to respond_to(:name)
  end

  it 'responds to details' do
    expect(a_work_list).to respond_to(:details)
  end

  it 'responds to sql_filters' do
    expect(a_work_list).to respond_to(:sql_filters)
  end

  it 'responds to add_sql_filter' do
    expect(a_work_list).to respond_to(:add_sql_filter)
  end

  it 'responds to remove_sql_filter' do
    expect(a_work_list).to respond_to(:remove_sql_filter)
  end

  it "responds to sql_filters_as_sql" do
    expect(a_work_list).to respond_to(:sql_filters_as_sql)
  end

  it "responds to sql_filters_as_objects" do
    expect(a_work_list).to respond_to(:sql_filters_as_objects)
  end

  it "is invalid without a name" do
    a_work_list.name = nil
    a_work_list.valid?
    expect(a_work_list.errors.keys).to include(:name)
  end
end
