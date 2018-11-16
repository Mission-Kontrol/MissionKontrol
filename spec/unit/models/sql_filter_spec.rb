# frozen_string_literal: true

require 'rails_helper'

module SQLFilter
  describe Equal do
    let(:an_equal_sql_filter) { described_class.new }

    it "responds to column" do
      expect(an_equal_sql_filter).to respond_to(:column)
    end

    it "responds to kind" do
      expect(an_equal_sql_filter).to respond_to(:kind)
    end

    it "responds to value" do
      expect(an_equal_sql_filter).to respond_to(:value)
    end

    it "responds to to_sql" do
      expect(an_equal_sql_filter).to respond_to(:to_sql)
    end

    it "has correct kind" do
      expect(an_equal_sql_filter.kind).to eq("equal")
    end

    describe "#to_sql" do
      context "when operator is present" do
        it "returns correct SQL" do
          column = "name"
          value = "foobar"
          operator = "and"

          filter = described_class.new
          filter.column = column
          filter.value = value
          filter.operator = operator
          expected = "#{operator} #{column} = '#{value}' "

          expect(filter.to_sql).to eq(expected)
        end
      end

      context "when operator is not present" do
        it "returns correct SQL" do
          column = "name"
          value = "foobar"

          filter = described_class.new
          filter.column = column
          filter.value = value
          expected = "where #{column} = '#{value}' "

          expect(filter.to_sql).to eq(expected)
        end
      end
    end

    describe "#to_hash" do
      it "returns correct hash of attributes" do
        column = "name"
        value = "foobar"
        kind = "equal"
        operator = "and"

        filter = described_class.new
        filter.column = column
        filter.value = value
        filter.operator = operator
        expected = {}
        expected['column'] = column
        expected['value'] = value
        expected['kind'] = kind
        expected['operator'] = operator

        expect(filter.to_hash).to eq(expected)
      end
    end
  end
end
