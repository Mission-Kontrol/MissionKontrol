# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListRelatableTables do
  subject { relatable_tables.call }

  let(:relatable_tables) do
    described_class.new(database_connection, table)
  end
  let(:database_connection) do
    Kuwinda::UseCase::DatabaseConnection.new(database).execute
  end
  let(:database) { create(:database) }
  let(:table) { 'Users' }

  context 'listing one to one connections' do
    it 'returns the tables with one to one relationships to the provided table' do
      expect(subject).to include('events')
    end

    it 'does not return tables without relationships to the provided table' do
      expect(subject).to_not include('welcomes')
    end
  end

  context 'listing one to many connections' do
    let(:table) { 'Companies' }

    it 'converts the table name to the singular' do
      expect(relatable_tables.send(:convert_table_name, table)).to eq('company')
    end
  end
end
