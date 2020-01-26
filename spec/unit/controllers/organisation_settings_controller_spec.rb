# frozen_string_literal: true

describe OrganisationSettingsController, type: :controller, js: true do
  before do
    create_user_with_permissions(role, :edit, table, database.id)
    sign_in @user
  end

  let(:organisation_setting) { create(:organisation_setting) }
  let(:role) { 'Sales' }
  let(:table) { 'users' }
  let(:database) { create(:database) }

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

    context 'when the organisation details have changed' do
      let(:params) do
        {
          id: organisation_setting.id,
          organisation_setting: {
            company_name: 'Name'
          }
        }
      end

      it 'updates the organisation' do
        subject

        expect(OrganisationSetting.find(organisation_setting.id).company_name).to eq('Name')
      end
    end
  end
end
