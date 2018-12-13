# frozen_string_literal: true

require 'rails_helper'

describe ViewBuilder, type: :model do
  describe 'validations' do
    it 'requires a table_name' do
      view_builder = described_class.new
      view_builder.valid?
      expect(view_builder.errors[:table_name]).to include("can't be blank")
    end
  end

  describe 'configurations' do
    it 'can save which fields to use for the view' do
      view_builder = described_class.new(table_name: 'Users', table_attributes: { visible: 'email' })
      expect(view_builder.table_attributes['visible']).to include('email')
    end
  end
end
