# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin_user) { create(:admin_user) }
  let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
  let(:params) { { license_key: license_key } }

  describe 'GET show' do
    context 'when admin is not present' do
      it 'redirects to the log in route' do
        get :show

        expect(response).to redirect_to(new_admin_user_session_path)
      end
    end

    context 'when admin does not have a license' do
      it 'redirects to the license route' do
        sign_in admin_user

        VCR.use_cassette('license_key/validation_failure', :record => :new_episodes) do
          get :show
        end

        expect(response).to redirect_to(license_path)
      end
    end

    context 'when admin has a valid license' do
      subject { get :show }

      before do
        create_user
        sign_in @user
      end

      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          subject

          expect(response).to redirect_to('/database_connection_error')
        end
      end

      context 'when open ssl error is raised' do
        it 'renders the show template' do
          allow(controller).to receive(:show).and_raise(OpenSSL::SSL::SSLError.new)

          subject

          expect(response).to render_template('dashboard/show')
        end
      end

      context 'when client database connection is valid' do
        it 'renders the show template' do
          subject

          expect(response).to render_template('show')
        end

        it 'sets the trial license as true if not a full license' do
          subject

          expect(assigns(:trial_license)).to eq true
        end
      end
    end
  end

  describe 'POST verify_license' do
    context 'when license key is a valid trial key' do
      let(:subject) do
        sign_in admin_user
        VCR.use_cassette('license_key/activation_success') do
          VCR.use_cassette('license_key/validation_success') do
            post :verify_license, params: params
          end
        end
      end
      let(:params) { { license_key: license_key } }
      let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }

      it 'saves the license key to an OrganisationSetting' do
        subject

        expect(OrganisationSetting.last.full_license).to eq false
        expect(OrganisationSetting.last.license_key).to eq license_key
      end

      it 'redirects to the new admin user registration path' do
        subject

        expect(response).to redirect_to(new_admin_user_registration_path)
      end
    end

    ## TODO: Rerun vcr cassettes and fix these specs
    xcontext 'when license key is a valid full key' do
      let(:subject) do
        sign_in admin_user
        VCR.use_cassette('license_key/activation_full_success') do
          VCR.use_cassette('license_key/validation_full_success') do
            post :verify_license, params: params
          end
        end
      end
      let(:params) { { license_key: license_key } }
      let(:license_key) { 'cF320SNdpxlZZXZ06gzY33Gx5i-30' }

      it 'saves the new license key to the OrganisationSetting' do
        subject

        expect(OrganisationSetting.last.full_license).to eq true
        expect(OrganisationSetting.last.license_key).to eq license_key
      end

      it 'redirects to the admin user registration path' do
        subject

        expect(response).to redirect_to(admin_user_registration_path)
      end
    end

    context 'when the OrganisationSetting already exists and the license key is being updated' do
      it 'saves the new license key to the OrganisationSetting' do
      end
    end
  end
end
