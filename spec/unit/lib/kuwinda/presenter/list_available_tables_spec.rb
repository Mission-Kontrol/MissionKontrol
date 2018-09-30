# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListAvailableTables do
  subject { list_tables.call }

  let(:list_tables) do
    described_class.new(client_database)
  end
  let(:client_database) do
    Kuwinda::UseCase::DatabaseConnection.new.execute
  end

  context 'listing tables' do
    it 'displays the available tables' do
      VCR.use_cassette('successfully_connected_with_datase') do
        expect(subject).to include('Attending Events', 'Users', 'Events')
      end
    end

    it 'does not display the schema_migrations table' do
      VCR.use_cassette('successfully_connected_with_datase') do
        expect(subject).to_not include('schema_migrations')
      end
    end
  end
end
