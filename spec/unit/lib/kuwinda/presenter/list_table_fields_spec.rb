# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListTableFields do
  subject { list_fields.call }

  let(:list_fields) do
    described_class.new(database_connection, table)
  end
  let(:database_connection) do
    Kuwinda::UseCase::DatabaseConnection.new(database).execute
  end
  let(:database) { create(:database) }
  let(:table) { 'Users' }

  context 'listing connections' do
    it 'displays the available table fields' do
      expect(subject).to include('email', 'name')
    end
  end
end
