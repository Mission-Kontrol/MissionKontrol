# frozen_string_literal: true

describe VerifyLicenseKeyService do
  let(:license_key) { 'P2FQ-8HKN-26CC-LINF-QCRI-DP0J' }

  describe '#verify' do
    subject { described_class.verify(license_key) }

    context 'when it is valid' do
      context 'when it has not been activated yet' do
        let(:license_key) { '2222222' }

        it 'returns true' do
          VCR.use_cassette('license_key/validation_and_activation') do
            expect(subject).to eq true
          end
        end

        context 'when it has exceeded activation' do
          let(:license_key) { '2222222' }

          it 'returns false' do
            VCR.use_cassette('license_key/valid_exceeded_activation') do
              expect(subject).to eq false
            end
          end
        end
      end

      context 'when it has already been activated' do
        it 'returns true' do
          VCR.use_cassette('license_key/verify_success') do
            expect(subject).to eq true
          end
        end
      end
    end

    context 'when it is not valid' do
      let(:license_key) { 'not_a_valid_key' }

      it 'returns false' do
        VCR.use_cassette('license_key/invalid_key') do
          expect(subject).to eq false
        end
      end
    end
  end
end
