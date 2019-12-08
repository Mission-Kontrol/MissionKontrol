# frozen_string_literal: true

require 'rails_helper'

describe DataTableState do
  let(:state) do
    {
      'time' => '1575812504142',
      'order' => { '0' => ['1', 'asc'] },
      'start' => '0',
      'length' => '10',
      'search' => { 'regex' => 'false', 'smart' => 'true', 'search' => '', 'caseInsensitive' => 'true' },
      'columns' =>
        {
          '0' => { 'search' => { 'regex' => 'false', 'smart' => 'true', 'search' => '', 'caseInsensitive' => 'true' }, 'visible' => 'true' },
          '1' => { 'search' => { 'regex' => 'false', 'smart' => 'true', 'search' => '', 'caseInsensitive' => 'true' }, 'visible' => 'true' },
          '2' => { 'search' => { 'regex' => 'false', 'smart' => 'true', 'search' => '', 'caseInsensitive' => 'true' }, 'visible' => 'true' },
          '3' => { 'search' => { 'regex' => 'false', 'smart' => 'true', 'search' => '', 'caseInsensitive' => 'true' }, 'visible' => 'false' }
        },
      'ColReorder' => ['0', '1', '2', '3']
    }
  end
  let(:data_state) { described_class.new(table: 'table', state: state) }

  context '#object' do
    context 'when passed a json as state' do
      it 'saves the state as json' do
        expect(data_state).to be_valid
      end
    end
  end

  context '#state_as_json' do
    subject { data_state.state_as_json }
    before do
      data_state.save
    end

    it 'returns the time as an integer' do
      expect(subject[:time]).to be_kind_of Numeric
    end

    it 'returns the start as an integer' do
      expect(subject[:start]).to be_kind_of Numeric
    end

    it 'returns the length as an integer' do
      expect(subject[:length]).to be_kind_of Numeric
    end

    it 'returns the order as a hash' do
      expect(subject[:order]).to be_kind_of Hash
    end

    it 'returns the search as an hash' do
      expect(subject[:search]).to be_kind_of Hash
    end

    # TODO: is this why col reorder does not save?
    it 'does not return the col reorder' do
      expect(subject).to_not include('colReorder')
    end

    context 'columns' do
      it 'returns the list of columns as a array' do
        expect(subject[:columns]).to be_kind_of Array
      end

      it 'returns individual columns as a hash' do
        expect(subject[:columns].first).to be_kind_of Hash
      end

      it 'adds visible key to each column' do
        expect(subject[:columns].first).to include('visible')
      end

      it 'returns visible value as a boolean' do
        expect(subject[:columns].first['visible']).to be_in([true, false])
      end
    end
  end

  context '#visible_columns' do
    subject { data_state.visible_columns }
    before do
      data_state.save
    end

    it 'returns an array' do
      expect(subject).to be_kind_of Array
    end

    it 'returns only the columns that have visible true' do
      expect(subject).to eq ['0', '1', '2']
    end
  end
end
