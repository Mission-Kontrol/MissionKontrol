# frozen_string_literal: true

require 'rails_helper'

def clear_admin_db_credentials
  return unless File.exist?(SensitiveData.admin_db_credentials_file_path)
  File.delete(SensitiveData.admin_db_credentials_file_path)
end

def clear_target_db_credentials
  return unless File.exist?(SensitiveData.target_db_credentials_file_path)
  File.delete(SensitiveData.target_db_credentials_file_path)
end

def clear_twilio_credentials
  return unless File.exist?(SensitiveData.twilio_credentials_file_path)
  File.delete(SensitiveData.twilio_credentials_file_path)
end

describe SensitiveData do
  let(:sensitive_data) { described_class }
  let(:admin_user) { build(:admin_user) }
  let(:organisation) { build(:organisation_setting) }

  describe '.encrypt' do
    it 'returns an encrypted string and salt' do
      data = { admin_database_name: 'kuwinda_admin' }
      encrypted = described_class.encrypt(data)

      actual = encrypted.split('$$')

      expect(actual.size).to eq(2)
    end
  end

  describe '.decrypt' do
    it 'returns a decrypted string' do
      data = { admin_database_name: 'kuwinda_admin' }
      encrypted = described_class.encrypt(data)

      actual = described_class.decrypt(encrypted)

      expect(actual).to eq(data)
    end

    context 'when password is missing' do
      it 'raises ActiveSupport::MessageVerifier::InvalidSignature' do
        data = { admin_database_name: 'kuwinda_admin' }
        encrypted = described_class.encrypt(data)

        expect { described_class.decrypt(encrypted, '') }.to(
          raise_error(ActiveSupport::MessageVerifier::InvalidSignature)
        )
      end
    end

    context 'when password is invalid' do
      it 'raises ActiveSupport::MessageVerifier::InvalidSignature' do
        data = { admin_database_name: 'kuwinda_admin' }
        encrypted = described_class.encrypt(data)

        expect { described_class.decrypt(encrypted, 'iaminvalid') }.to(
          raise_error(ActiveSupport::MessageVerifier::InvalidSignature)
        )
      end
    end
  end

  describe '.get_admin_database_credential' do
    context 'when set' do
      it 'returns credential' do
        clear_admin_db_credentials
        db_name = 'kuwinda_db'
        described_class.set_admin_database_credential(:database_name, db_name)

        actual = described_class.get_admin_database_credential(:database_name)

        expect(actual).to eq(db_name)
      end
    end

    context 'when not set' do
      it 'returns nil' do
        clear_admin_db_credentials

        actual = organisation.admin_database_name

        expect(actual).to eq(nil)
      end
    end
  end

  describe '.set_admin_database_credential' do
    it 'sets admin database credential correctly' do
      clear_admin_db_credentials
      name = 'kuwinda_db'
      credential = :database_name

      actual = described_class.set_admin_database_credential(credential, name)

      expect(actual).to eq(true)
    end
  end

  describe '.get_target_database_credential' do
    context 'when set' do
      it 'returns credential' do
        clear_target_db_credentials
        db_name = 'target_db'
        described_class.set_target_database_credential(:database_name, db_name)

        actual = described_class.get_target_database_credential(:database_name)

        expect(actual).to eq(db_name)
      end
    end

    context 'when not set' do
      it 'returns nil' do
        clear_target_db_credentials

        actual = organisation.target_database_name

        expect(actual).to eq(nil)
      end
    end
  end

  describe '.set_target_database_credential' do
    it 'sets target database credential correctly' do
      clear_target_db_credentials
      name = 'kuwinda_db'
      credential = :database_name

      actual = described_class.set_target_database_credential(credential, name)

      expect(actual).to eq(true)
    end
  end
  
  describe '.get_twilio_credential' do
    context 'when set' do
      it 'returns credential' do
        clear_twilio_credentials
        caller_id = '+447448958786'
        credential = :caller_id
        described_class.set_twilio_credential(credential, caller_id)

        actual = described_class.get_twilio_credential(credential)

        expect(actual).to eq(caller_id)
      end
    end

    context 'when not set' do
      it 'returns nil' do
        clear_twilio_credentials
        credential = :caller_id

        actual = described_class.get_twilio_credential(credential)

        expect(actual).to eq(nil)
      end
    end
  end

  describe '.set_twilio_caller_id' do
    it 'sets twilio credential correctly' do
      clear_twilio_credentials
      caller_id = '+447448958786'
      credential = :caller_id

      actual = described_class.set_twilio_credential(credential, caller_id)

      expect(actual).to eq(true)
    end
  end
end
