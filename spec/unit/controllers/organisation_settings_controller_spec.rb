# frozen_string_literal: true

describe OrganisationSettingsController, type: :controller, js: true do
  before do
    create_user_with_permissions(role, :edit, table)
    sign_in @user
  end

  let(:organisation_setting) { create(:organisation_setting) }
  let(:role) { 'Sales' }
  let(:table) { 'users' }

  describe '#edit' do
    subject { get :edit, params: { id: organisation_setting.id }, format: :js }

    it 'assigns the organisation setting' do
      subject

      expect(assigns(:organisation)).to eq(organisation_setting)
    end

    it 'renders the edit template' do
      subject

      expect(response).to render_template(:edit)
    end
  end

  describe '#update' do
    subject { post :update, params: params, format: :js }

    context 'when the target db credentials have not changed' do
      let(:params) { { id: organisation_setting.id, organisation_setting: { company_name: 'Name' } } }

      it 'assigns the organisation setting' do
        subject

        expect(assigns(:organisation)).to eq(organisation_setting)
      end
    end

    context 'when the target db credentials have changed' do
      let(:params) do
        {
          id: organisation_setting.id,
          organisation_setting: {
            company_name: 'Name',
            target_database_name: ENV['DEMO_CLIENT_DB_NAME'],
            target_database_username: ENV['DEMO_CLIENT_DB_USER'],
            target_database_password: ENV['DEMO_CLIENT_DB_PASSWORD'],
            target_database_host: ENV['DEMO_CLIENT_DB_HOST'],
            target_database_port: ENV['DEMO_CLIENT_DB_PORT'],
            target_database_type: 'postgres'
          }
        }
      end

      it 'updates the db connection' do
        subject

        expect(OrganisationSetting.find(organisation_setting.id).company_name).to eq('Name')
      end

      it 'updates the available permissions' do
        subject

        expect(Permission.all.count).to eq(17)
      end

      it 'creates target table settings for tables' do
        subject

        expect(TargetTableSetting.all.count).to eq(5)
      end
    end
  end
end
