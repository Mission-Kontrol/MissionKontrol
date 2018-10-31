# frozen_string_literal: true

require 'rails_helper'

def clear_admin_db_credentials
  if File.exist?(SensitiveData.admin_db_credentials_file_path)
    File.delete(SensitiveData.admin_db_credentials_file_path)
  end
end

def clear_target_db_credentials
  if File.exist?(SensitiveData.target_db_credentials_file_path)
    File.delete(SensitiveData.target_db_credentials_file_path)
  end
end

describe SensitiveData do
  let(:sensitive_data) { described_class }
  let(:admin_user) { build(:admin_user) }

  describe ".encrypt" do
    it "returns an encrypted string and salt" do
      data = {admin_database_name: "kuwinda_admin"}
      encrypted = described_class.encrypt(data)

      actual = encrypted_parts = encrypted.split("$$")

      expect(actual.size).to eq(2)
    end
  end

  describe ".decrypt"  do
    it "returns a decrypted string" do
      data = { admin_database_name: "kuwinda_admin" }
      encrypted = described_class.encrypt(data)

      actual = described_class.decrypt(encrypted)

      expect(actual).to eq(data)
    end

    context "when password is missing" do
      it "raises ActiveSupport::MessageVerifier::InvalidSignature" do
        data = { admin_database_name: "kuwinda_admin" }
        encrypted = described_class.encrypt(data)

        expect{
          described_class.decrypt(encrypted, '')
        }.to raise_error(ActiveSupport::MessageVerifier::InvalidSignature)
      end
    end

    context "when password is invalid" do
      it "raises ActiveSupport::MessageVerifier::InvalidSignature" do
        data = { admin_database_name: "kuwinda_admin" }
        encrypted = described_class.encrypt(data)

        expect{
          described_class.decrypt(encrypted, 'iaminvalid')
        }.to raise_error(ActiveSupport::MessageVerifier::InvalidSignature)
      end
    end
  end

  describe ".get_admin_database_credential" do
    context "when set" do
      it "returns credential" do
        clear_admin_db_credentials
        new_db_name = "kuwinda_db"
        described_class.set_admin_database_credential(:database_name, new_db_name)

        actual = described_class.get_admin_database_credential(:database_name)

        expect(actual).to eq(new_db_name)
      end
    end

    context "when not set" do
      it "returns nil" do
        clear_admin_db_credentials

        actual = admin_user.admin_database_name

        expect(actual).to eq(nil)
      end
    end
  end

  describe ".set_admin_database_credential" do
    it "sets admin database credential correctly" do
      clear_admin_db_credentials
      new_db_name = "kuwinda_db"

      actual = described_class.set_admin_database_credential(:database_name, new_db_name)

      expect(actual).to eq(true)
    end
  end

  describe ".get_target_database_credential" do
    context "when set" do
      it "returns credential" do
        clear_target_db_credentials
        new_db_name = "target_db"
        described_class.set_target_database_credential(:database_name, new_db_name)

        actual = described_class.get_target_database_credential(:database_name)

        expect(actual).to eq(new_db_name)
      end
    end

    context "when not set" do
      it "returns nil" do
        clear_target_db_credentials

        actual = admin_user.target_database_name

        expect(actual).to eq(nil)
      end
    end
  end

  describe ".set_target_database_credential" do
    it "sets target database credential correctly" do
      clear_target_db_credentials
      new_db_name = "kuwinda_db"

      actual = described_class.set_target_database_credential(:database_name, new_db_name)

      expect(actual).to eq(true)
    end
  end
end
