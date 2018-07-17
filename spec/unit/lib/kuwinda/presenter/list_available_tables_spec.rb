require 'rails_helper'

describe Kuwinda::Presenter::ListAvailableTables do
  subject { list_tables.call }

  let(:list_tables) {
    described_class.new(client_database)
  }
  let(:client_database) {
    Kuwinda::UseCase::DatabaseConnection.new.execute
  }

  context 'listing tables' do
    it 'displays the available tables' do
      expect(subject).to include('Attending Events', 'Users', 'Events')
    end

    it 'does not display the schema_migrations table' do
      expect(subject).to_not include('schema_migrations')
    end
  end
end
