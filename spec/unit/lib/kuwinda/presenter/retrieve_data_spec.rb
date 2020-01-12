# frozen_string_literal: true

describe Kuwinda::Presenter::RetrieveData do
  subject { retrieve_data.call }

  let(:retrieve_data) do
    described_class.new(database_connection, view_builder, query_limiter)
  end
  let(:database_connection) do
    Kuwinda::UseCase::DatabaseConnection.new(database).execute
  end
  let(:view_builder) { create(:view_builder) }
  let(:query_limiter) { 'WHERE user_id = 3' }
  let(:expected_result) do
    {
      0 => ['London', 'pro', 'gold', 6],
      1 => ['Morzine', 'beginner', 'silver', 2]
    }
  end

  # TODO: this is failing intermittently due to a different id
  # create on every run, expected_result is not always consistent
  context 'retrieving data' do
    xit 'returns the correct fields from the table' do
      expect(subject).to eq expected_result
    end
  end
end
