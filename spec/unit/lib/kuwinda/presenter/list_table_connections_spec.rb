require 'rails_helper'

describe Kuwinda::Presenter::ListTableConnections do
  # fixtures :all
  subject { list_connections.call }

  let(:list_connections) {
    described_class.new(client_database, table, user_id)
  }
  let(:client_database) {
    Kuwinda::UseCase::DatabaseConnection.new.execute
  }
  let(:table) { 'events' }
  let(:user_id) { 2 }
  # let(:sailing) { events(:sailing) }

  context 'listing connections' do
    it 'displays the available tables' do
      expect(subject.first).to include({"area" => "Mont Chery"})
    end
  end
end
