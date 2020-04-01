# frozen_string_literal: true

describe DatabasesController, type: :controller, js: true do
  describe '#create' do
    subject { post :create, params: params, format: :js }

    context 'with valid params' do
      let(:params) do
        {
          database: {
            friendly_name: 'Test database',
            adapter: 'postgresql',
            host: ENV['DEMO_CLIENT_DB_HOST'],
            port: 5432,
            name: ENV['DEMO_CLIENT_DB_NAME'],
            username: ENV['DEMO_CLIENT_DB_USER'],
            password: ENV['DEMO_CLIENT_DB_PASSWORD']
          }
        }
      end

      let(:expected_editable_fields) do
        {
          id: { editable: false, mandatory: false },
          user_id: { editable: false, mandatory: false },
          event_id: { editable: false, mandatory: false },
          created_at: { editable: false, mandatory: false },
          updated_at: { editable: false, mandatory: false }
        }.with_indifferent_access
      end

      it 'saves the database credentials' do
        subject

        expect(assigns(:database)).to eq(Database.last)
      end

      it 'updates the available permissions' do
        subject

        expect(Permission.all.count).to eq(20)
      end

      it 'creates target table settings for tables' do
        subject

        expect(TargetTableSetting.all.count).to eq(5)
      end

      it 'saves the editable fields on the target table settings' do
        subject

        expect(TargetTableSetting.first.editable_fields).to eq expected_editable_fields
      end
    end
  end

  describe '#update' do
    subject { post :update, params: params, format: :js }

    let(:params) { { id: database.id } }
    let(:database) { create(:database) }
    let(:editable_fields) do
      {
        id: { editable: false, mandatory: false },
        user_id: { editable: false, mandatory: false },
        event_id: { editable: false, mandatory: false },
        created_at: { editable: false, mandatory: false },
        updated_at: { editable: false, mandatory: false }
      }.with_indifferent_access
    end
    let(:target_table_setting) { create(:target_table_setting, name: 'attending_events', database_id: database.id, editable_fields: editable_fields) }
    # @target_table_setting = create(:target_table_setting, name: table, database_id: @database.id, nested_table: nil, editable_fields: editable_fields)

    context 'when target table settings already exist' do
      let(:expected_editable_fields) do
        {
          id: { editable: false, mandatory: false },
          user_id: { editable: false, mandatory: false },
          event_id: { editable: false, mandatory: false },
          created_at: { editable: false, mandatory: false },
          updated_at: { editable: false, mandatory: false }
        }.with_indifferent_access
      end

      it 'does not update the field settings' do
      end
    end

    context 'when target table settings do not include all fields' do
      it 'adds the new fields to the editable_fields column' do
      end
    end

    context 'when a column has been updated to be mandatory on external database but is not mandatory on editable fields' do
      it 'updates the mandatory setting for that field' do
      end
    end
  end
end
