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
  let(:query_limiter) { 'WHERE user_id = 1' }
  let(:expected_result) do
    {
      0 => ['London', 'pro', 'gold', 1],
      1 => ['Manchester', 'pro', 'silver', 1],
      2 => ['Sheffield', 'beginner', 'silver', 1]
    }
  end

  context 'retrieving data' do
    it 'returns the correct fields from the table' do
      expect(subject).to eq expected_result
    end
  end
end