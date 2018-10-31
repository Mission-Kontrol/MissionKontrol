module SensitiveData
  include ActiveSupport::Concern

  def self.get_admin_database_credential(credential)
    if admin_db_credentials
      return admin_db_credentials[credential]
    end

    nil
  end

  def self.set_admin_database_credential(credential, value)
    data = nil

    if admin_db_credentials
      data = admin_db_credentials
    else
      data = {}
    end

    data[credential] = value
    SensitiveData.save_admin_db_credentials(data)
  end

  def self.get_target_database_credential(credential)
    if target_db_credentials
      return target_db_credentials[credential]
    end

    nil
  end

  def self.set_target_database_credential(credential, value)
    data = nil

    if target_db_credentials
      data = target_db_credentials
    else
      data = {}
    end

    data[credential] = value
    SensitiveData.save_target_db_credentials(data)
  end

  def self.encrypt(data)
    salt = SecureRandom.hex(64)
    encrypted_data = crypt(salt).encrypt_and_sign(data)
    "#{salt}$$#{encrypted_data}"
  end

  def self.decrypt(token, password = Rails.application.secrets.secret_key_base)
    salt, data = token.split "$$"
    crypt(salt, password).decrypt_and_verify(data)
  end

  private

  def self.admin_db_credentials_file_path
    "./config/admin_db_credentials_#{Rails.env}.txt"
  end

  def self.target_db_credentials_file_path
    "./config/target_db_credentials_#{Rails.env}.txt"
  end

  def self.save_admin_db_credentials(admin_db_credentials)
    encrypted_db_credentials = SensitiveData.encrypt(admin_db_credentials)
    File.write(SensitiveData.admin_db_credentials_file_path, encrypted_db_credentials)
    true
  end

  def self.save_target_db_credentials(target_db_credentials)
    encrypted_db_credentials = SensitiveData.encrypt(target_db_credentials)
    File.write(SensitiveData.target_db_credentials_file_path, encrypted_db_credentials)
    true
  end

  def admin_db_credentials
    existing_admin_db_credentials = nil

    if File.exists?(SensitiveData.admin_db_credentials_file_path)
      data = File.read(SensitiveData.admin_db_credentials_file_path)

      unless data.blank?
        return SensitiveData.decrypt(data)
      end
    end

    nil
  end

  def target_db_credentials
    existing_target_db_credentials = nil

    if File.exists?(SensitiveData.target_db_credentials_file_path)
      data = File.read(SensitiveData.target_db_credentials_file_path)

      unless data.blank?
        return SensitiveData.decrypt(data)
      end
    end

    nil
  end

  def self.admin_db_credentials
    existing_admin_db_credentials = nil

    if File.exists?(SensitiveData.admin_db_credentials_file_path)
      data = File.read(SensitiveData.admin_db_credentials_file_path)

      unless data.blank?
        return SensitiveData.decrypt(data)
      end
    end

    nil
  end

  def self.target_db_credentials
    existing_target_db_credentials = nil

    if File.exists?(SensitiveData.target_db_credentials_file_path)
      data = File.read(SensitiveData.target_db_credentials_file_path)

      unless data.blank?
        return SensitiveData.decrypt(data)
      end
    end

    nil
  end

  def self.crypt(salt, password = Rails.application.secrets.secret_key_base)
    len = ActiveSupport::MessageEncryptor.key_len
    key = ActiveSupport::KeyGenerator.new(password).generate_key(salt, len)
    ActiveSupport::MessageEncryptor.new key
  end
end
