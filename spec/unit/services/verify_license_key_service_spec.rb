# frozen_string_literal: true

describe VerifyLicenseKeyService do
  let(:admin_user) { create(:admin_user) }
  let(:trial_license_key) { 'wcCXJZ5fd3TdekwrB5No912UO2-26' }
  let(:trial_license_activation_id) { '1559143878' }
  let(:invalid_license_key) { 'not_a_license_key' }
  let(:full_license_key) { 'cF320SNdpxlZZXZ06gzY33Gx5i-30' }
  let(:full_license_activation_id) { '1559479387' }

  context '#activate' do
    context 'trial license key' do
      let(:subject) { described_class.activate(trial_license_key, 'trial') }

      context 'when it is valid' do
        it 'returns the activation id' do
          VCR.use_cassette('license_key/activation_success') do
            expect(subject).to eq trial_license_activation_id
          end
        end
      end

      context 'when it is invalid' do
        context 'when it is not a valid trial license key' do
          it 'returns nil' do
            VCR.use_cassette('license_key/activation_full_failure') do
              expect(described_class.activate(invalid_license_key, 'trial')).to eq nil
            end
          end
        end
      end
    end

    context 'full license key' do
      let(:subject) { described_class.activate(full_license_key, 'full') }

      context 'when it is valid' do
        it 'returns the activation id' do
          VCR.use_cassette('license_key/activation_full_success') do
            expect(subject).to eq full_license_activation_id
          end
        end
      end

      context 'when it is invalid' do
        context 'when it is not a valid trial license key' do
          it 'returns nil' do
            VCR.use_cassette('license_key/activation_full_failure') do
              expect(described_class.activate(invalid_license_key, 'full')).to eq nil
            end
          end
        end
      end
    end
  end

  context '#validate' do
    context 'with trial license key' do
      context 'and valid activation id' do
        let(:subject) { described_class.validate(trial_license_key, trial_license_activation_id, 'trial') }

        xit 'returns license key data' do
          VCR.use_cassette('license_key/validation_success') do
            expect(subject).to_not be_nil
          end
        end
      end
    end

    context 'full license key' do
      context 'and valid activation id' do
        let(:subject) { described_class.validate(full_license_key, full_license_activation_id, 'full') }

        xit 'returns license key data' do
          VCR.use_cassette('license_key/validation_success') do
            expect(subject).to_not be_nil
          end
        end
      end
    end
  end
end
