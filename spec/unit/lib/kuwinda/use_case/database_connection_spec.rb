# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::UseCase::DatabaseConnection do
  context 'when establishing a database connection' do
    subject { described_class.new.execute }
    let(:expected_result) do
      %w[attending_events schema_migrations welcomes users events companies]
    end

    it 'can list the tables available in the database' do
      expect(subject.connection.tables).to match_array expected_result
    end
  end
end
