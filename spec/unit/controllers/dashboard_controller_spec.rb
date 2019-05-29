# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin_without_license) { create(:admin_user) }
  let(:admin_with_license) { create(:admin_user, :with_license) }
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

    context 'when license exist' do
      context 'when validation succeeds' do
        it 'renders the dashboard show template' do
          sign_in admin_with_license

          VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
            get :show
          end

          expect(response).to render_template('show')
        end
      end

      context 'when license activation fails' do
        it 'redirects to the license route' do
          admin_without_activation = create(:admin_user)

          sign_in admin_without_activation

          VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
            get :show
          end

          expect(response).to redirect_to(license_path)
        end
      end

      context 'when license validation fails' do
        it 'redirects to the license route' do
          admin_without_validation = create(:admin_user, activation_id: '1558260633')

          sign_in admin_without_validation

          VCR.use_cassette('license_key/validation_failure', record: :new_episodes) do
            get :show
          end

          expect(response).to redirect_to(license_path)
        end
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
    context 'when license key is present' do
      context 'when activation succeeds' do
        context 'when validation succeeds' do
          before do
            sign_in admin_without_license

            params = {
              license_key: 'wcCXJZ5fd3TdekwrB5No912UO2-26'
            }

            VCR.use_cassette('license_key/validation_success', record: :new_episodes) do
              post :verify_license, params: params
            end

            admin_without_license.reload
          end

          it 'redirects back to the dashboard route' do
            expect(response).to redirect_to(dashboard_path)
          end

          it "captures activation id" do
            expect(admin_without_license.activation_id).to_not be_nil
          end

          it "captures license key" do
            expect(admin_without_license.license_key).to_not be_nil
          end
        end

        context 'when validation fails' do
          it 'renders the verify license template' do
            sign_in admin_with_invalid_license

            VCR.use_cassette('license_key/validation_failure', record: :new_episodes) do
              post :verify_license
            end

            expect(response).to render_template('verify_license')
          end
        end
      end

      context 'when activation fails' do
        it 'renders the verify license template' do
          sign_in admin_without_license

          VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
            post :verify_license
          end

          expect(response).to render_template('verify_license')
        end
      end
    end

    context 'when license is missing' do
      it 'renders the verify license template' do
        sign_in admin_without_license

        VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
          post :verify_license
        end

        expect(response).to render_template('verify_license')
      end
    end
  end
end
