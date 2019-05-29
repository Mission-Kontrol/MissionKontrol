# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin_without_license) { create(:admin_user) }
  let(:admin_with_license) { create(:admin_user, :with_license) }

  before do
    AdminUser.delete_all
  end

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
      context 'when license activation and validation suceeds' do
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
end
