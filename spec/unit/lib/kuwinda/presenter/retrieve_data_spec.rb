# frozen_string_literal: true

describe Kuwinda::Presenter::RetrieveData do
  subject { retrieve_data.call }

  let(:retrieve_data) do
    described_class.new(client_database, view_builder, query_limiter)
  end
  let(:client_database) do
    Kuwinda::UseCase::DatabaseConnection.new.execute
  end
  let(:view_builder) { create(:view_builder) }
  let(:query_limiter) { 'WHERE user_id = 3' }
  let(:expected_result) do
    {
      0 => ['Morzine', 'beginner', 'silver', 2],
      1 => ['London', 'pro', 'gold', 6],
    }
  end

  context 'retrieving data' do
    xit 'returns the correct fields from the table' do
      expect(subject).to eq expected_result
    end
  end
end
