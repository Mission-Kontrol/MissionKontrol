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

  it 'responds to to_sql' do
    expect(a_work_list).to respond_to(:to_sql)
  end

  it 'responds to sql_to_run' do
    expect(a_work_list).to respond_to(:sql_to_run)
  end

  it 'is invalid without a name' do
    a_work_list.name = nil
    a_work_list.valid?
    expect(a_work_list.errors.keys).to include(:name)
  end

  describe 'to_sql' do
    it 'joins sql filters correctly' do
      expected = "SELECT * FROM users where name = 'dave' or name = 'david' ;"
      work_list = build(:work_list)
      work_list.data_table_name = 'users'
      filter = work_list.sql_filters.first['sql_filter']
      filter['value'] = 'dave'
      filter['column'] = 'name'
      filter1 = {
        'kind' => 'equal',
        'column' => 'name',
        'operator' => 'or',
        'value' => 'david'
      }
      work_list.sql_filters << { 'sql_filter' => filter1 }

      actual = work_list.to_sql

      expect(actual).to eq(expected)
    end
  end

  describe '#sql_to_run' do
    context 'when sql_query is present' do
      it 'returns sql_query' do
        sql_query = 'sqlquery'
        work_list = described_class.new
        work_list.sql_query = sql_query
        expect(work_list.sql_to_run).to eq('sqlquery')
      end
    end

    context 'when sql_filters are present' do
      it 'returns sql from filters' do
        work_list = described_class.new
        work_list.data_table_name = 'users'
        filter = work_list.sql_filters.first
        filter['sql_filter']['column'] = 'id'
        filter['sql_filter']['value'] = 1
        expected = "SELECT * FROM users where id = '1' ;"

        actual = work_list.sql_to_run

        expect(actual).to eq(expected)
      end
    end
  end
end
