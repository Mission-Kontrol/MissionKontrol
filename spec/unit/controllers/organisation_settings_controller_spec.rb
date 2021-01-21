# frozen_string_literal: true

describe OrganisationSettingsController, type: :controller, js: true do
  before do
    create_user_with_permissions(role, :edit, table, database.id)
    sign_in @user
  end

  let(:organisation_setting) { create(:organisation_setting) }
  let(:role) { 'Editor' }
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
    let(:params) do
      {
        id: organisation_setting.id,
        organisation_setting: {
          company_name: 'Name',
          license_key: organisation_setting.license_key
        }
      }
    end

    context 'when the target db credentials have not changed' do
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
            company_name: 'NewName',
            license_key: organisation_setting.license_key
          }
        }
      end

      it 'updates the organisation' do
        subject

        expect(OrganisationSetting.find(organisation_setting.id).company_name).to eq('NewName')
      end
    end

    context 'when the organisation license_key has changed and is invalid' do
      let(:params) do
        {
          id: organisation_setting.id,
          organisation_setting: {
            company_name: 'NewName',
            license_key: '2222222'
          }
        }
      end

      xit 'assigns @invalid_key' do
        VCR.use_cassette('license_key/valid_exceeded_activation') do
          subject

          expect(assigns(:invalid_key)).to eq true
        end
      end

      xit 'does not update the organisation' do
        VCR.use_cassette('license_key/valid_exceeded_activation') do
          subject

          expect(OrganisationSetting.find(organisation_setting.id).company_name).not_to eq 'NewName'
        end
      end
    end
  end
end
