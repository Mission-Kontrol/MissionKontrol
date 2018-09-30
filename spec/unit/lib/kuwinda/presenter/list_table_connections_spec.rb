# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListTableConnections do
  # fixtures :all
  subject { list_connections.call }

  let(:list_connections) do
    described_class.new(client_database, table, user_id)
  end
  let(:client_database) do
    Kuwinda::UseCase::DatabaseConnection.new.execute
  end
  let(:table) { 'events' }
  let(:user_id) { 2 }
  # let(:sailing) { events(:sailing) }

  context 'listing connections' do
    it 'displays the available tables' do
      VCR.use_cassette('successfully_connected_with_database') do
        expect(subject.first).to include('area' => 'Mont Chery')
      end
    end
  end
end
