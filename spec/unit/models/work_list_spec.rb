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

  describe "#add_sql_filter" do
    context "when no filter exists" do
      before(:all) do
        @work_list = build(:work_list)
        @filter = SQLFilter::Equal.new
        @filter.column = 'name'
        @filter.value = 'james'
        @work_list.add_sql_filter(@filter)
      end

      it "adds an sql filter to the work list sql filters" do
        expect(@work_list.sql_filters).to eq([@filter.to_hash])
      end

      it "sets the id correctly" do
        expect(@work_list.sql_filters.first['id']).to be_a(Integer)
      end
    end

    context "when one or more filters exists" do
      before(:all) do
        @work_list = build(:work_list)
        @filter = SQLFilter::Equal.new
        @filter1 = SQLFilter::Equal.new
        @filter.column = 'name'
        @filter.value = 'james'
        @filter1.column = 'age'
        @filter1.value = 25
        @work_list.add_sql_filter(@filter)
        @work_list.add_sql_filter(@filter1)
      end

      it "adds an sql filter to the work list sql filters" do
        expect(@work_list.sql_filters).to match_array([@filter.to_hash, @filter1.to_hash])
      end

      it "sets the id correctly" do
        expect(@work_list.sql_filters.map{ |i| i['id'] }).to all(be_an(Integer))
      end
    end
  end

  describe "#remove_sql_filter" do
    it "removes sql filter" do
      work_list = build(:work_list)
      filter = SQLFilter::Equal.new
      filter.column = "name"
      filter.value = "james"
      work_list.add_sql_filter filter

      work_list.remove_sql_filter(filter)

      expect(work_list.sql_filters.size).to eq(0)
    end
  end
end
