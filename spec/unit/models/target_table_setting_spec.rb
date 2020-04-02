# frozen_string_literal: true

require_relative '../../support/unit/fake_active_record'
class Column < FakeActiveRecord
  def name;  super end
end

describe TargetTableSetting do
  let(:id_column) { instance_double('Column', name: 'id') }
  let(:cat_column) { instance_double('Column', name: 'cat_id') }
  let(:dog_column) { instance_double('Column', name: 'dog_id') }

  describe '#create_editable_fields' do
    subject { target_table_setting.create_editable_fields(columns) }
    let(:columns) { [id_column, cat_column, dog_column] }
    let(:expected_result) do
      {
        'id' => { 'editable' => false, 'mandatory' => false },
        'cat_id' => { 'editable' => false, 'mandatory' => false },
        'dog_id' => { 'editable' => false, 'mandatory' => false }
      }
    end

    context 'when editable_fields is nil' do
      let(:target_table_setting) { create(:target_table_setting, editable_fields: nil) }

      it 'adds the columns as editable_fields' do
        subject
        expect(target_table_setting.editable_fields).to eq expected_result
      end
    end

    context 'when editable_fields is an empty hash' do
      let(:target_table_setting) { create(:target_table_setting, editable_fields: {}) }

      it 'adds the columns as editable_fields' do
        subject
        expect(target_table_setting.editable_fields).to eq expected_result
      end
    end
  end

  describe '#update_editable_fields' do
    subject { target_table_setting.update_editable_fields(columns) }
    let(:columns) { [id_column, cat_column, dog_column] }

    let(:target_table_setting) do
      create(:target_table_setting, editable_fields:
        { 'id' =>
          {
            'editable' => true,
            'mandatory' => true
          },
          'parrot_id' =>
          {
            'editable' => false,
            'mandatory' => false
          }
        }
      )
    end

    context 'when there are new columns' do
      it 'adds the new columns to the editable fields' do
        subject
        expect(target_table_setting.editable_fields['cat_id']).not_to eq nil
      end
    end

    context 'when the column already exists as an editable field' do
      it 'does not update the editable fields' do
        subject
        expect(target_table_setting.editable_fields['id']).to eq({ 'editable' => true, 'mandatory' => true })
      end
    end

    context 'when there are stale columns as editable fields' do
      it 'removes the stale columns from the editable fields' do
        subject
        expect(target_table_setting.editable_fields['parrot_id']).to eq nil
      end
    end
  end
end
