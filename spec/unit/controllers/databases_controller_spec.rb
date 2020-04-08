# frozen_string_literal: true

describe DatabasesController, type: :controller, js: true do
  let!(:admin_role) { create(:role, :admin) }
  let(:database_params) do
    {
      friendly_name: 'Test database',
      adapter: 'postgresql',
      host: ENV['DEMO_CLIENT_DB_HOST'],
      port: 5432,
      name: ENV['DEMO_CLIENT_DB_NAME'],
      username: ENV['DEMO_CLIENT_DB_USER'],
      password: ENV['DEMO_CLIENT_DB_PASSWORD']
    }
  end

  describe '#index' do
    subject { get :index, params: params, xhr: true }

    let!(:database_1) { create(:database) }
    let!(:database_2) { create(:database) }
    let(:params) { {} }

    before do
      create_user_with_role(admin_role)
      sign_in @user
    end

    it 'lists all databases' do
      subject

      expect(assigns(:databases).count).to eq 2
    end

    context 'when user has admin abilities and param setting is present' do
      let(:params) { { settings: true } }

      it 'sets can_add as true' do
        subject

        expect(JSON.parse(response.body)['can_add']).to be_truthy
      end
    end
  end

  describe '#new' do
    subject { get :new, xhr: true }

    before do
      create_user_with_role(admin_role)
      sign_in @user
    end

    it 'creates a new database' do
      subject

      expect(assigns(:database)).not_to be nil
    end
  end

  describe '#create' do
    subject { post :create, params: params, xhr: true }

    context 'with valid params' do
      let(:params) do
        {
          database: database_params
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

      it 'renders the create template' do
        subject

        expect(response).to render_template :create
      end
    end

    context 'with param commit = "Test connection"' do
      let(:params) do
        {
          database: database_params,
          commit: 'Test connection'
        }
      end

      it 'renders test_connection' do
        subject

        expect(response).to render_template :test_connection
      end

      it 'assigns active_connection as true if active' do
        subject

        expect(assigns(:active_connection)).to eq true
      end
    end
  end

  describe '#edit' do
    subject { get :edit, params: { id: database.id }, xhr: true }

    let!(:database) { create(:database) }

    before do
      create_user_with_role(admin_role)
      sign_in @user
    end

    it 'assigns database based on id' do
      subject

      expect(assigns(:database)).to eq database
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

    context 'with mission_kontrol_relay gem credentials' do
      let(:params) { { id: database.id, database: { domain_url: 'https://domain_url.org', gem_token: 'gem_token' } } }

      context 'when submitting valid credentials' do
        it 'updates the database' do
          subject

          database.reload
          expect(database.domain_url).to eq 'https://domain_url.org'
        end
      end

      xcontext 'when testing connection' do
        let(:params) do
          {
            id: database.id,
            database: { domain_url: 'https://domain_url.org', gem_token: 'gem_token' },
            commit: 'Test gem'
          }
        end

        it 'renders test_gem template' do
          subject

          expect(response).to render_template :test_gem
        end

        it 'assigns active_connection as true if active' do
          subject

          expect(assigns(:active_connection)).to eq true
        end
      end

      context 'when removing gem connection' do
        let(:database) { create(:database, domain_url: 'https://domain_url.org', gem_token: 'gem_token') }
        let(:params) do
          {
            id: database.id,
            commit: 'Remove gem'
          }
        end

        it 'deletes the gem credentials from the database' do
          subject

          database.reload
          expect(database.domain_url).to eq nil
          expect(database.gem_token).to eq nil
        end
      end
    end
  end

  describe '#destroy' do
    context 'when database exists' do
      subject { delete :destroy, params: { id: database.id }, xhr: true }

      let!(:database) { create(:database) }

      before do
        create_user_with_role(admin_role)
        sign_in @user
      end

      it 'deletes the database' do
        subject

        expect(Database.where(id: database.id)).to eq []
      end

      it 'redirects to dashboard_path' do
        subject

        expect(response).to redirect_to dashboard_path
      end
    end

    context 'when database does not exist' do
      subject { delete :destroy, params: { id: 234 }, xhr: true }

      before do
        create_user_with_role(admin_role)
        sign_in @user
      end

      it 'throws an error' do
        subject

        expect(flash[:alert]).to eq 'Something went wrong trying to delete this database. Please try again.'
      end

      it 'redirects to databases path' do
        subject

        expect(response).to redirect_to databases_path
      end
    end
  end
end
