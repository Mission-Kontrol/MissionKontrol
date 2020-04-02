# frozen_string_literal: true

describe Kuwinda::DatabaseAdapter do
  subject { described_class.adapter(scheme) }
  describe '#adapter' do
    context 'when scheme is postgresql' do
      let(:scheme) { 'postgresql' }

      it 'returns postgresql' do
        expect(subject).to eq 'postgresql'
      end
    end

    context 'when scheme is postgres' do
      let(:scheme) { 'postgres' }

      it 'returns postgresql' do
        expect(subject).to eq 'postgresql'
      end
    end

    context 'when scheme is mysql' do
      let(:scheme) { 'mysql' }

      it 'returns mysql2' do
        expect(subject).to eq 'mysql2'
      end
    end

    context 'when scheme is mysql2' do
      let(:scheme) { 'mysql2' }

      it 'returns mysql2' do
        expect(subject).to eq 'mysql2'
      end
    end

    context 'when scheme is unknown' do
      let(:scheme) { 'mongo' }

      it 'raises an InvalidClientDatabaseError' do
        expect { subject }.to raise_error(InvalidClientDatabaseError, 'Do not know how to make adpater for mongo')
      end
    end
  end
end
