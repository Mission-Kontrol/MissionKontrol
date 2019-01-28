# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Presenter::ListTableFieldsWithType do
  subject { list_fields_with_type.call }

  let(:list_fields_with_type) do
    described_class.new(client_database, table)
  end
  let(:client_database) do
    Kuwinda::UseCase::DatabaseConnection.new.execute
  end
  let(:table) { 'Users' }

  context 'listing connections' do
    it 'displays the available tables their types' do
      expect(subject).to include(["id", "integer", "Users"], ["email", "string", "Users"])
    end
  end
end
