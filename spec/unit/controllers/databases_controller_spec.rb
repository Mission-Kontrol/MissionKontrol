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

        expect(TargetTableSetting.find_by(name: 'attending_events').editable_fields).to eq expected_editable_fields
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
        user_id: { editable: true, mandatory: false },
        event_id: { editable: true, mandatory: true },
        created_at: { editable: false, mandatory: false },
        updated_at: { editable: false, mandatory: false }
      }.with_indifferent_access
    end
    let!(:target_table_setting) { create(:target_table_setting, name: 'attending_events', database_id: database.id, editable_fields: editable_fields) }

    context 'when target table settings already exist' do
      it 'does not update the field settings' do
        subject

        target_table_setting.reload
        expect(target_table_setting.editable_fields).to eq editable_fields
      end
    end

    context 'when target table settings do not include all fields' do
      let(:editable_fields) do
        {
          id: { editable: false, mandatory: false },
          user_id: { editable: true, mandatory: false },
          event_id: { editable: true, mandatory: true }
        }.with_indifferent_access
      end

      let(:expected_editable_fields) do
        {
          id: { editable: false, mandatory: false },
          user_id: { editable: true, mandatory: false },
          event_id: { editable: true, mandatory: true },
          created_at: { editable: false, mandatory: false },
          updated_at: { editable: false, mandatory: false }
        }.with_indifferent_access
      end

      it 'adds the new fields to the editable_fields column' do
        subject

        target_table_setting.reload
        expect(target_table_setting.editable_fields).to eq expected_editable_fields
      end
    end

    context 'when a column has been removed on the external database' do
      let(:editable_fields) do
        {
          id: { editable: false, mandatory: false },
          user_id: { editable: true, mandatory: false },
          event_id: { editable: true, mandatory: true },
          created_at: { editable: false, mandatory: false },
          updated_at: { editable: false, mandatory: false },
          name: { editable: false, mandatory: false }
        }.with_indifferent_access
      end

      it 'removes the setting for that field' do
        subject

        target_table_setting.reload
        expect(target_table_setting.editable_fields['name']).to eq nil
      end
    end
  end
end
