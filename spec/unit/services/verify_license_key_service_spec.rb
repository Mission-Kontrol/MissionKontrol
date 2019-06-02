# frozen_string_literal: true

describe VerifyLicenseKeyService do
  let(:admin_user) { create(:admin_user) }
  let(:trial_license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
  let(:trial_license_activation_id) { '1559143878' }
  let(:full_license_key) { 'cF320SNdpxlZZXZ06gzY33Gx5i-30' }
  let(:full_license_activation_id) { '1559479387' }

  after do
    Rails.cache.clear
  end

  context '#activate' do
    context 'trial license key' do
      let(:subject) { described_class.activate(admin_user, 'trial') }

      before do
        admin_user.license_key = trial_license_key
        admin_user.save
      end

      context 'when it is valid' do
        it 'returns true' do
          VCR.use_cassette('license_key/activation_success') do
            expect(subject).to eq true
          end
        end

        it 'saves the activation_id against the user' do
          VCR.use_cassette('license_key/activation_success') do
            subject
            expect(admin_user.activation_id).to eq trial_license_activation_id
          end
        end
      end

      context 'when it is invalid' do
        context 'when it is not a valid full license key' do
          let(:trial_license_key) { 'not_a_license_key' }

          it 'returns false' do
            VCR.use_cassette('license_key/activation_full_failure') do
              expect(described_class.activate(admin_user, 'trial')).to eq false
            end
          end
        end

        context 'when it is a valid full license key' do
          before do
            admin_user.license_key = full_license_key
            admin_user.save
          end

          it 'returns true' do
            VCR.use_cassette('license_key/activation_full_success') do
              expect(subject).to eq true
            end
          end

          it 'saves the activation_id against the user' do
            VCR.use_cassette('license_key/activation_full_success') do
              subject
              expect(admin_user.activation_id).to eq full_license_activation_id
            end
          end

          it 'marks full license as true against the user' do
            VCR.use_cassette('license_key/activation_full_success') do
              subject
              expect(admin_user.full_license).to eq true
            end
          end
        end
      end
    end
  end

  context '#validate' do
    subject { described_class.validate(admin_user, 'trial') }

    context 'with a valid license key' do
      before do
        admin_user.license_key = trial_license_key
        admin_user.activation_id = trial_license_activation_id
        admin_user.save
      end

      it 'returns true' do
        VCR.use_cassette('license_key/validation_success') do
          expect(subject).to eq true
        end
      end

      it 'saves the validated key to the cache' do
        VCR.use_cassette('license_key/validation_success') do
          cache_key = "license-#{admin_user.license_key}"

          subject
          expect(Rails.cache.fetch(cache_key)).to eq cache_key
        end
      end
    end

    context 'with an unactivated license key' do
      before do
        admin_user.license_key = trial_license_key
        admin_user.activation_id = nil
        admin_user.save
      end

      it 'saves the activation_id against the user' do
        VCR.use_cassette('license_key/validation_success') do
          VCR.use_cassette('license_key/activation_success') do
            subject
            expect(admin_user.activation_id).to eq trial_license_activation_id
          end
        end
      end

      it 'returns true' do
        VCR.use_cassette('license_key/validation_success') do
          VCR.use_cassette('license_key/activation_success') do
            expect(subject).to eq true
          end
        end
      end
    end

    context 'with an invalid license key' do
      before do
        admin_user.license_key = 'not_a_license_key'
        admin_user.activation_id = '1558260633'
      end

      it 'returns false' do
        VCR.use_cassette('license_key/validation_failure_invalid_key') do
          expect(subject).to eq false
        end
      end
    end
  end
end
