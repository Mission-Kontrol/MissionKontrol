# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:subject) do
    sign_in admin_user
    get :show
  end

  let(:admin_user) { create(:admin_user) }
  let(:full_license_key) { 'full_license_key' }
  let(:full_license_activation_id) { 'full_activation_id' }
  let(:trial_license_key) { 'trial_license_key' }
  let(:trial_license_activation_id) { 'trial_activation_id' }

  after do
    Rails.cache.clear
  end

  describe 'GET show' do
    describe 'client database connection' do
      before do
        admin_user.license_key = trial_license_key
        admin_user.save
        Rails.cache.write("license-#{trial_license_key}", expires_in: 2.hours)
      end

      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          subject

          expect(response).to render_template('tables/bad_connection')
        end
      end

      context 'when client database connection is valid' do
        it 'renders the show template' do
          subject

          expect(response).to render_template('show')
        end
      end
    end

    describe 'license keys' do
      context 'when full license key is present in the cache' do
        before do
          admin_user.license_key = full_license_key
          admin_user.save
          Rails.cache.write("license-#{full_license_key}", expires_in: 2.hours)
        end

        it 'renders the dashboard show template' do
          subject

          expect(response).to render_template('show')
        end

        it 'does not request to validate the license key' do
          expect(VerifyLicenseKeyService).to_not receive(:validate)

          subject
        end
      end

      context 'when full license key is not in cache' do
        before do
          Rails.cache.clear
        end

        context 'when admin user has full license key as true' do
          before do
            admin_user.full_license = true
            admin_user.license_key = full_license_key
          end

          context 'when activation id is present' do
            before do
              admin_user.activation_id = full_license_activation_id
              admin_user.save
            end

            it 'requests to validate the present key' do
              expect(VerifyLicenseKeyService).to receive(:validate).with(admin_user, 'full')
              subject
            end

            it 'saves the validated key to the cache' do
              allow(VerifyLicenseKeyService).to receive(:validate).and_return(true)
              subject

              cached_license_key = Rails.cache.fetch("license-#{full_license_key}")
              expect(cached_license_key).to eq "license-#{full_license_key}"
            end
          end

          context 'when activation id is not present' do
            before do
              admin_user.activation_id = nil
              admin_user.save
            end

            it 'requests an activation id' do
              expect(VerifyLicenseKeyService).to receive(:activate).with(admin_user, 'full')
              subject
            end

            context 'when activation_id is saved' do
              before do
                allow(VerifyLicenseKeyService).to receive(:activate).and_return(true)
                admin_user.activation_id = full_license_activation_id
                admin_user.save
              end

              it 'saves the validated key to the cache' do
                allow(VerifyLicenseKeyService).to receive(:validate).and_return(true)

                subject

                cached_license_key = Rails.cache.fetch("license-#{full_license_key}")
                expect(cached_license_key).to eq "license-#{full_license_key}"
              end
            end
          end
        end
      end

      context 'when trial license key is present in the cache' do
        before do
          admin_user.license_key = trial_license_key
          admin_user.save
          Rails.cache.write("license-#{trial_license_key}", expires_in: 2.hours)
        end

        it 'renders the dashboard show template' do
          subject

          expect(response).to render_template('show')
        end

        it 'does not request to validate the license key' do
          expect(VerifyLicenseKeyService).to_not receive(:validate).with(admin_user, 'trial')

          subject
        end
      end

      context 'when trial license key is not in cache' do
        before do
          Rails.cache.clear
        end

        context 'when admin user has trial license key as false' do
          before do
            admin_user.full_license = nil
            admin_user.license_key = trial_license_key
          end

          context 'when activation id is present' do
            before do
              admin_user.activation_id = trial_license_activation_id
              admin_user.save
            end

            it 'requests to validate the present key' do
              expect(VerifyLicenseKeyService).to receive(:validate).with(admin_user, 'trial')
              subject
            end

            it 'saves the validated key to the cache' do
              allow(VerifyLicenseKeyService).to receive(:validate).and_return(true)

              subject

              cached_license_key = Rails.cache.fetch("license-#{trial_license_key}")
              expect(cached_license_key).to eq "license-#{trial_license_key}"
            end
          end

          context 'when activation id is not present' do
            before do
              admin_user.activation_id = nil
              admin_user.save
            end

            it 'requests an activation id' do
              expect(VerifyLicenseKeyService).to receive(:activate).with(admin_user, 'trial')
              subject
            end

            context 'when activation_id is saved' do
              before do
                allow(VerifyLicenseKeyService).to receive(:activate).and_return(true)
                admin_user.activation_id = trial_license_activation_id
                admin_user.save
              end

              it 'saves the validated key to the cache' do
                allow(VerifyLicenseKeyService).to receive(:validate).and_return(true)

                subject

                cached_license_key = Rails.cache.fetch("license-#{trial_license_key}")
                expect(cached_license_key).to eq "license-#{trial_license_key}"
              end
            end
          end
        end
      end

      context 'when license key is not present on the admin user' do
        it 'redirects to the license route' do
          subject

          expect(response).to redirect_to(license_path)
        end
      end

      context 'when trial license key saved against the user is invalid' do
        before do
          admin_user.license_key = 'invalid_trial_key'
          admin_user.activation_id = trial_license_activation_id
          admin_user.save
          Rails.cache.clear
        end

        it 'redirects to the license route' do
          allow(VerifyLicenseKeyService).to receive(:validate).and_return(false)

          subject

          expect(response).to redirect_to(license_path)
        end
      end

      context 'when full license key saved against the user is invalid' do
        before do
          admin_user.license_key = 'invalid_full_key'
          admin_user.activation_id = full_license_activation_id
          admin_user.full_license = true
          admin_user.save
          Rails.cache.clear
        end

        it 'redirects to the license route' do
          allow(VerifyLicenseKeyService).to receive(:validate).and_return(false)

          subject

          expect(response).to redirect_to(license_path)
        end
      end
    end
  end

  describe 'POST verify_license' do
    let(:params) { { license_key: license_key } }

    context 'with trial license' do
      let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
      let(:activation_id) { '1559143878' }

      before do
        sign_in admin_user
      end

      it 'updates the license key of the current admin user' do
        VCR.use_cassette('license_key/activation_success') do
          VCR.use_cassette('license_key/validation_success') do
            post :verify_license, params: params
          end
        end

        admin_user.reload
        expect(admin_user.license_key).to eq(license_key)
      end

      it 'updates the activation id of the current admin user' do
        VCR.use_cassette('license_key/activation_success') do
          VCR.use_cassette('license_key/validation_success') do
            post :verify_license, params: params
          end
        end

        admin_user.reload
        expect(admin_user.activation_id).to eq(activation_id)
      end
    end
  end
end
