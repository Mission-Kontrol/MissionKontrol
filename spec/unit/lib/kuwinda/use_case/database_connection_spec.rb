require 'rails_helper'

describe Kuwinda::UseCase::DatabaseConnection do
  context 'when establishing a database connection' do
    subject { described_class.new.execute }

    it 'can list the tables available in the database' do
      expect(subject.connection.tables).to eq ["attending_events", "schema_migrations", "welcomes", "users", "events"]
    end
  end
end
