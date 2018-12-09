# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListTableFields do
  subject { list_fields.call }

  let(:list_fields) do
    described_class.new(client_database, table)
  end
  let(:client_database) do
    Kuwinda::UseCase::DatabaseConnection.new.execute
  end
  let(:table) { 'Users' }

  context 'listing connections' do
    it 'displays the available tables' do
      expect(subject).to include('email', 'name')
    end
  end
end
