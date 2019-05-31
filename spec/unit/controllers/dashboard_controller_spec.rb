# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin_without_license) { create(:admin_user) }
  let(:admin_without_license_1) { create(:admin_user) }
  let(:admin_without_license_2) { create(:admin_user) }
  let(:admin_without_license_3) { create(:admin_user) }
  let(:admin_without_license_4) { create(:admin_user) }
  let(:admin_with_license) { create(:admin_user, :with_license) }
  let(:admin_with_trial_license) { create(:admin_user, :with_license) }
  let(:admin_with_full_license) { create(:admin_user, license_key: '') }
  let(:admin_with_invalid_license) { create(:admin_user, license_key: 'not_a_license') }

  describe 'GET show' do
    context 'when client database connection is invalid' do
      it 'renders the bad connection template' do
        sign_in admin_with_license
        allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

        VCR.use_cassette('license_key/validation_success') do
          get :show
        end

        expect(response).to render_template('tables/bad_connection')
      end
    end

    context 'when client database connection is valid' do
      it 'renders the show template' do
        sign_in admin_with_license

        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          get :show
        end

        expect(response).to render_template('show')
      end
    end

    context 'when full license key is present' do
      xit 'renders the dashboard show template' do
        sign_in admin_with_full_license

        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          get :show
        end

        expect(response).to render_template('show')
      end
    end

    context 'when trial license key is present' do
      it 'renders the dashboard show template' do
        sign_in admin_with_trial_license

        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          get :show
        end

        expect(response).to render_template('show')
      end
    end

    context 'when license key is invalid' do
      it 'redirects to the license route' do
        sign_in admin_with_invalid_license

        VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
          get :show
        end

        expect(response).to redirect_to(license_path)
      end
    end

    context 'when license does not exist' do
      it 'redirects to the license route' do
        sign_in admin_without_license

        VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
          get :show
        end

        expect(response).to redirect_to(license_path)
      end
    end
  end

  describe 'POST verify_license' do
    context 'when full license' do
      before do
        sign_in admin_without_license_1
        @params = {}
        @params['license_key'] = 'full_license'

        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          post :verify_license, params: @params
        end
      end

      xit 'updates the license key of the current admin user' do
        expect(admin_without_license_1.license_key).to eq(@params['license_key'])
      end

      xit 'updates the activation id of the current admin user' do
        expect(admin_without_license_1.activation_id).to_not be_nil
      end

      xit 'updates the current admin user to a full license' do
        expect(admin_without_license_1.full_license).to eq(true)
      end

      xit 'redirects to dashboard' do
        expect(response).to redirect_to(dashboard_path)
      end
    end

    context 'when trial license' do
      before do
        sign_in admin_without_license_2
        @params = {}
        @params['license_key'] = 'wcCXJZ5fd3TdekwrB5No912UO2-26'

        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          post :verify_license, params: @params
        end

        admin_without_license_2.reload
      end

      it 'updates the license key of the current admin user' do
        expect(admin_without_license_2.license_key).to eq(@params['license_key'])
      end

      it 'updates the activation id of the current admin user' do
        expect(admin_without_license_2.activation_id).to_not be_nil
      end

      it 'does not update the current admin user to a full license' do
        expect(admin_without_license_2.full_license).to eq(false)
      end

      it 'redirects to dashboard' do
        expect(response).to redirect_to(dashboard_path)
      end
    end

    context 'when license key is invalid' do
      before do
        sign_in admin_without_license_3
        @params = {}
        @params['license_key'] = 'invalid_license'

        VCR.use_cassette('license_key/validation_failure', record: :new_episodes) do
          post :verify_license, params: @params
        end
      end

      it 'does not update the license key of the current admin user' do
        expect(admin_without_license_3.license_key).to be_nil
      end

      it 'does not update the activation id of the current admin user' do
        expect(admin_without_license_3.activation_id).to be_nil
      end

      it 'does not update the current admin user to a full license' do
        expect(admin_without_license_3.full_license).to eq(false)
      end

      it 'renders the verify license template' do
        expect(response).to render_template('verify_license')
      end
    end

    context 'when license key is missing' do
      it 'renders the verify license template' do
        sign_in admin_without_license_4

        VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
          post :verify_license
        end

        expect(response).to render_template('verify_license')
      end
    end
  end
end
