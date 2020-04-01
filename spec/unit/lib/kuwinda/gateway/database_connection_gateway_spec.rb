# frozen_string_literal: true

require 'rails_helper'

describe Kuwinda::Gateway::DatabaseConnectionGateway do
  subject { gateway.connect }
  let(:database) { create(:database) }
  let(:gateway) { described_class.new(database) }

  # TODO: more specific testing of error messages - InvalidClientDatabaseError not valid

  context '#connect' do
    context 'with valid database credentials' do
      it 'establishes an active connection' do
        expect(subject.connection.active?).to eq true
      end
    end

    context 'with no database credentials passed in' do
      let(:database) { nil }

      it 'raises an InvalidClientDatabaseError' do
        expect { subject }.to raise_error(InvalidClientDatabaseError, 'Client database is invalid')
      end
    end

    context 'with a invalid adapter' do
      let(:database) { create(:database, adapter: 'mongo') }

      it 'raises an error' do
        expect { subject }.to raise_error(InvalidClientDatabaseError, 'Do not know how to make adpater for mongo')
      end
    end
  end
end
