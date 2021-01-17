# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
  let(:params) { { license_key: license_key } }

  describe 'GET show' do
    let(:admin_user) { create(:admin_user) }

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
        Rails.cache.fetch(license_key, expires_in: 24.hours) { license_key }
      end

      after do
        Rails.cache.delete(license_key)
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
    subject { post :verify_license, params: { license_key: license_key } }
    context 'when license key is valid' do
      let(:license_key) { '2222222' }

      context 'and no AdminUsers exist yet' do
        it 'saves the license key to the organisation' do
          VCR.use_cassette('license_key/validation_and_activation') do
            subject

            expect(OrganisationSetting.last.license_key).to eq license_key
          end
        end

        it 'redirects to the new admin user registration path' do
          VCR.use_cassette('license_key/validation_and_activation') do
            subject

            expect(response).to redirect_to(new_admin_user_registration_path)
          end
        end
      end

      context 'and AdminUser already exists' do
        let!(:admin_user) { create(:admin_user) }
        let(:license_key) { '2222222' }

        it 'saves the license key to the organisation' do
          VCR.use_cassette('license_key/validation_and_activation') do
            subject

            expect(OrganisationSetting.last.license_key).to eq license_key
          end
        end

        it 'redirects to the admin user registration path' do
          VCR.use_cassette('license_key/validation_and_activation') do
            subject

            expect(response).to redirect_to(admin_user_registration_path)
          end
        end
      end
    end

    context 'when license key is not valid' do
      let(:license_key) { 'not_a_valid_key' }
      it 'renders the verify_license template' do
        VCR.use_cassette('license_key/invalid_key') do
          subject

          expect(response).to render_template('verify_license')
        end
      end
    end
  end
end
