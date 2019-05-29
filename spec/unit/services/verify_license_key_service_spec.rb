# frozen_string_literal: true

describe VerifyLicenseKeyService do
  let(:user) { create(:admin_user, license_key: license_key) }
  let(:license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }

  context '#activate' do
    context 'with a valid license key' do
      it 'returns a 200 status' do
        VCR.use_cassette('license_key/activation_success') do
          expect(described_class.activate(user)[:status]).to eq 200
        end
      end
    end

    context 'with an invalid license key' do
      let(:license_key) { 'not_a_license_key' }

      it 'returns a 400 status' do
        VCR.use_cassette('license_key/activation_failure', record: :new_episodes) do
          expect(described_class.activate(user)[:status]).to eq 500
        end
      end
    end
  end

  context '#validate' do
    subject { described_class.validate(user) }
    context 'with a valid license key' do
      before do
        user.activation_id = '1558260633'
      end

      it 'returns a 200 status' do
        VCR.use_cassette('license_key/validation_success') do
          expect(subject[:status]).to eq 200
        end
      end
    end

    context 'with an unactivated license key' do
      before do
        user.license_key = 'Fw1vI9g2450xr0tb2V15nZ82dW-27'
        user.activation_id = '1558260633'
      end

      it 'returns a 500 status' do
        VCR.use_cassette('license_key/validation_failure_inactive_key') do
          expect(subject[:status]).to eq 500
          expect(subject[:message]).to eq 'Invalid license key.'
        end
      end
    end

    context 'with an invalid license key' do
      before do
        user.license_key = 'not_a_license_key'
        user.activation_id = '1558260633'
      end

      it 'returns a 500 status' do
        VCR.use_cassette('license_key/validation_failure_invalid_key') do
          expect(subject[:status]).to eq 500
          expect(subject[:message]).to eq 'Invalid license key.'
        end
      end
    end

    context 'with an invalid activation_id' do
      before do
        user.activation_id = 'not_a_valid_activation_key'
      end

      it 'returns a 500 status' do
        VCR.use_cassette('license_key/validation_failure_invalid_id') do
          expect(subject[:status]).to eq 500
          expect(subject[:message]).to eq 'Required.'
        end
      end
    end
  end
end
