# frozen_string_literal: true

module SensitiveData
  include ActiveSupport::Concern

  def self.get_twilio_credential(credential)
    return twilio_credentials[credential] if twilio_credentials

    nil
  end

  def self.set_twilio_credential(credential, value)
    data = twilio_credentials || {}
    data[credential] = value
    SensitiveData.save_twilio_credentials(data)
  end

  def self.get_admin_database_credential(credential)
    return admin_db_credentials[credential] if admin_db_credentials

    nil
  end

  def self.set_admin_database_credential(credential, value)
    data = admin_db_credentials || {}
    data[credential] = value
    SensitiveData.save_admin_db_credentials(data)
  end

  def self.get_target_database_credential(credential)
    return target_db_credentials[credential] if target_db_credentials

    nil
  end

  def self.set_target_database_credential(credential, value)
    data = target_db_credentials || {}
    data[credential] = value
    SensitiveData.save_target_db_credentials(data)
  end

  def self.encrypt(data)
    salt = SecureRandom.hex(64)
    encrypted_data = crypt(salt).encrypt_and_sign(data)
    "#{salt}$$#{encrypted_data}"
  end

  def self.decrypt(token, password = Rails.application.secrets.secret_key_base)
    salt, data = token.split '$$'
    crypt(salt, password).decrypt_and_verify(data)
  end

  private_class_method

  def self.admin_db_credentials_file_path
    verify_sensitive_data_location
    "./config/sensitive_data/admin_db_credentials_#{Rails.env}.txt"
  end

  def self.target_db_credentials_file_path
    verify_sensitive_data_location
    "./config/sensitive_data/target_db_credentials_#{Rails.env}.txt"
  end

  def self.twilio_credentials_file_path
    verify_sensitive_data_location
    "./config/sensitive_data/twilio_credentials_#{Rails.env}.txt"
  end

  def self.save_admin_db_credentials(admin_db_credentials)
    token = SensitiveData.encrypt(admin_db_credentials)
    File.write(SensitiveData.admin_db_credentials_file_path, token)
    true
  end

  def self.save_target_db_credentials(target_db_credentials)
    token = SensitiveData.encrypt(target_db_credentials)
    File.write(SensitiveData.target_db_credentials_file_path, token)
    true
  end

  def self.save_twilio_credentials(twilio_credentials)
    token = SensitiveData.encrypt(twilio_credentials)
    File.write(SensitiveData.twilio_credentials_file_path, token)
    true
  end

  def self.admin_db_credentials
    if File.exist?(SensitiveData.admin_db_credentials_file_path)
      data = File.read(SensitiveData.admin_db_credentials_file_path)
      return SensitiveData.decrypt(data) unless data.blank?
    end

    nil
  end

  def self.target_db_credentials
    if File.exist?(SensitiveData.target_db_credentials_file_path)
      data = File.read(SensitiveData.target_db_credentials_file_path)
      return SensitiveData.decrypt(data) unless data.blank?
    end

    nil
  end

  def self.twilio_credentials
    if File.exist?(SensitiveData.twilio_credentials_file_path)
      data = File.read(SensitiveData.twilio_credentials_file_path)
      return SensitiveData.decrypt(data) unless data.blank?
    end

    nil
  end

  def self.crypt(salt, password = Rails.application.secrets.secret_key_base)
    len = ActiveSupport::MessageEncryptor.key_len
    key = ActiveSupport::KeyGenerator.new(password).generate_key(salt, len)
    ActiveSupport::MessageEncryptor.new key
  end

  def self.verify_sensitive_data_location
    FileUtils.mkdir_p './config/sensitive_data'
  end
end
