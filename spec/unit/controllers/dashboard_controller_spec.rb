# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin_user) { create(:admin_user) }
  let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
  let(:params) { { license_key: license_key } }

  xdescribe 'POST verify_license' do
    xcontext 'when admin is signed in' do
      context 'when license key is present' do
        let(:subject) do
          sign_in admin_user
          # post :verify_license, params: params
          VCR.use_cassette('license_key/activation_success') do
            VCR.use_cassette('license_key/validation_success') do
              post :verify_license, params: params
            end
          end
        end

        it 'redirects to dashboard' do
          subject

          expect(response).to redirect_to(dashboard_path)
        end
      end
    end

    xcontext 'when admin is not signed in' do
      context 'when license key is present' do
        let(:subject) do
          VCR.use_cassette('license_key/activation_success') do
            VCR.use_cassette('license_key/validation_success') do
              post :verify_license, params: params
            end
          end
        end

        it 'redirects to sign up route with an activation key and the license key' do
          subject

          redirect_params = Rack::Utils.parse_query(URI.parse(response.location).query)

          expect(URI.parse(response.location).path).to eq(new_admin_user_registration_path)
          expect(redirect_params["license_key"]).to eq(license_key)
          expect(redirect_params["activation_id"]).to_not be(nil)
        end
      end
    end

    context 'when license key is not present' do
      let(:subject) do
        VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
          post :verify_license, params: { license_key: nil }
        end
      end

      it 'redirects to license route' do
        subject

        expect(response).to render_template(:verify_license)
      end
    end
  end

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

          expect(response).to render_template('layouts/bad_connection')
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
      end
    end
  end
end
