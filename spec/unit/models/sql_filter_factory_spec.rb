# frozen_string_literal: true

require 'rails_helper'

describe SQLFilterFactory do
  it 'responds to .build_sql_filter' do
    expect(described_class).to respond_to(:build_sql_filter)
  end

  describe '.build_sql_filter' do
    context "when sql filter kind is equal" do
      it 'returns a SQLFilter::Equal filter' do
        filter_attributes = {}
        filter_attributes['kind'] = 'equal'
        actual = described_class.build_sql_filter(filter_attributes)
        expect(actual).to be_a(SQLFilter::Equal)
      end
    end

    context "when sql filter kind is unknown" do
      it 'returns nil' do
        filter_attributes = {}
        filter_attributes['kind'] = 'notknown'
        actual = described_class.build_sql_filter(filter_attributes)
        expect(actual).to be_nil
      end
    end
  end
end
